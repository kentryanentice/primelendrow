import Principal "mo:base/Principal";
import Blob "mo:base/Blob";
import Time "mo:base/Time";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Types "./usersType";

module {
    public class UsersManager(userEntries: [(Principal, Types.User)]) {
        private let users = HashMap.HashMap<Principal, Types.User>(0, Principal.equal, Principal.hash);
        
        public func init() {
            for ((principal, user) in userEntries.vals()) {
                users.put(principal, user);
            };
        };
        
        public func getEntries() : [(Principal, Types.User)] {
            return Iter.toArray(users.entries());
        };
        
        public func createUser(caller: Principal) : Result.Result<Types.User, Text> {
            if (Principal.isAnonymous(caller)) {
                return #err("Unauthorized Access. User generation has been rejected.");
            };

            switch (users.get(caller)) {
                case (?_) {
                    return #err("User information has already been registered.");
                };
                case null {
                let username = "User_" # Principal.toText(caller);

                let newUser : Types.User = {
                    principalId = caller;
                    profile = "";
                    primaryId = "";
                    username = username;
                    firstName = "";
                    middleName = "";
                    lastName = "";
                    mobile = "";
                    userType = #Pending;
                    userLevel = #L1;
                    userBadge = #Normal;
                    createdAt = Time.now();
                    updatedAt = Time.now();
                };

                users.put(caller, newUser);
                return #ok(newUser);
                };
            };
        };

        public func updateUser(
            caller: Principal,   
            primaryId: Blob,
            firstName: Text, 
            middleName: Text, 
            lastName: Text, 
            mobile: Text
        ) : Result.Result<Types.User, Text> {
            if (Principal.isAnonymous(caller)) {
                return #err("Unauthorized Access. User generation has been rejected.");
            };

            switch (users.get(caller)) {
                case (null) { 
                    return #err("Unauthorized Access. User cannot be found."); 
                };
                case (?existingUser) {

                    if (not (existingUser.userType == #Pending or existingUser.userType == #Verifying or existingUser.userLevel == #L1 or existingUser.userBadge == #Normal)) {
                        return #err("Unauthorized Access. User upgrade has been rejected.");
                    };

                    // let currentTime = Time.now();
                    // let tenDaysInNanoseconds : Int = 10 * 24 * 60 * 60 * 1000000000;
                    
                    // if (currentTime < existingUser.updatedAt + tenDaysInNanoseconds) {
                    //     return #err("Upgrade Failed. Update available once every 10 days.");
                    // };

                    let allUsers = Iter.toArray(users.vals());

                    for (user in allUsers.vals()) {
                        if (user.firstName == firstName and user.middleName == middleName and user.lastName == lastName) {
                            return #err("Upgrade Failed. Fullname has already been taken.");
                        };

                        if (user.mobile == mobile) {
                            return #err("Upgrade Failed. Mobile No. has already been taken.");
                        };
                    };
                    
                    let updatedUser : Types.User = {
                        principalId = caller;
                        profile = existingUser.profile;
                        primaryId = primaryId;
                        username = existingUser.username;
                        firstName = firstName;
                        middleName = middleName;
                        lastName = lastName;
                        mobile = mobile;
                        userType = #Verifying;
                        userLevel = #L1;
                        userBadge = #Normal;
                        createdAt = existingUser.createdAt;
                        updatedAt = Time.now();
                    };
                    
                    users.put(caller, updatedUser);
                    return #ok(updatedUser);
                };
            };
        };
        
        public func getUser(caller: Principal) : Result.Result<Types.User, Text> {
            if (Principal.isAnonymous(caller)) {
                return #err("Unauthorized Access. User generation has been rejected.");
            };

            switch (users.get(caller)) {
                case (?user) { #ok(user) };
                case null { #err("Unauthorized State. User information cannot be found.") };
            };
        };

        public func verifyUser(
            caller: Principal,
            userPrincipal: Principal
        ) : Result.Result<Types.User, Text> {

            switch (users.get(caller)) {
                case (null) {
                    return #err("Unauthorized State. User information cannot be found.");
                };

                case (?callerUser) {
                    if (not (callerUser.userType == #Admin or callerUser.userLevel == #L100 or callerUser.userBadge == #Verified)) {
                        return #err("Unauthorized Access. User upgrade has been rejected.");
                    };
                    
                    switch (users.get(userPrincipal)) {
                        case (null) {
                            return #err("Unauthorized State. User information cannot be found.");
                        };
    

                        case (?existingUser) {
                            if (existingUser.userType != #Verifying or existingUser.userLevel != #L1 or existingUser.userBadge != #Normal) {
                                return #err("Unauthorized State. User verification has been rejected.");
                            };

                            // if (existingUser.userType == #Pending or existingUser.userLevel == #L1 or existingUser.userBadge == #Normal) {
                            //     return #err("Pending State. User verification has been rejected.");
                            // };

                            let verifiedUser : Types.User = {
                                principalId = userPrincipal;
                                profile = existingUser.profile;
                                primaryId = existingUser.primaryId;
                                username = existingUser.username;
                                firstName = existingUser.firstName;
                                middleName = existingUser.middleName;
                                lastName = existingUser.lastName;
                                mobile = existingUser.mobile;
                                userType = #User;
                                userLevel = #L2;
                                userBadge = #Verified;
                                createdAt = existingUser.createdAt;
                                updatedAt = Time.now();
                            };
                                
                            users.put(userPrincipal, verifiedUser);
                            return #ok(verifiedUser);
                        };
                    };
                };
            };
        };

        public func getAllUsers() : [Types.User] {
            return Iter.toArray(users.vals());
        };
    };
}