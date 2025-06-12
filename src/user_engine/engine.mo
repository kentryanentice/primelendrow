import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Types "users/usersType";
import UsersManager "users/usersManager";

actor User {
    private stable var userEntries : [(Principal, Types.User)] = [];
    private var usersManager = UsersManager.UsersManager(userEntries);

    private let ADMINISTRATOR1 : Principal = Principal.fromText("4gbnk-pwauj-bpju5-aie6k-3nhje-r65no-nkk5o-p2w6d-moygy-i3dii-cae");
    private let ADMINISTRATOR2 : Principal = Principal.fromText("xcr7h-tl77o-s6leb-dupns-eutzd-n6rl7-pk5qz-xfkih-stclv-uty4q-iae");
    private let ADMINISTRATORLOCAL : Principal = Principal.fromText("imm2k-7ktgb-3zvz3-k7xql-4awjw-c3j6r-vz53l-csfuj-sc7hj-rcsno-rqe");

    system func preupgrade() {
        userEntries := usersManager.getEntries();
    };

    system func postupgrade() {
        usersManager.init();
    };

    public shared ({ caller }) func createUser(
        principalId: Principal
    ) : async Result.Result<Types.User, Text> {
        if (not (caller == principalId)) {
            return #err("Unauthorized Access. User generation has been rejected.");
        };
        return usersManager.createUser(caller);
    };

    public shared ({ caller }) func updateUser(
        principalId: Principal,
        primaryId: Blob,
        firstName: Text,
        middleName: Text,
        lastName: Text,
        mobile: Text
    ) : async Result.Result<Types.User, Text> {
        if (not (caller == principalId)) {
            return #err("Unauthorized Access. User upgrade has been rejected.");
        };
        return usersManager.updateUser(caller, primaryId, firstName, middleName, lastName, mobile);
    };

    public shared ({ caller }) func getUser(
        principalId: Principal
    ) : async Result.Result<Types.User, Text> {
        if (not (caller == principalId)) {
            return #err("Unauthorized Access. User fetching has been rejected.");
        };
        return usersManager.getUser(caller);
    };

    public shared ({ caller }) func verifyUser(
        principalId: Principal,
        userPrincipal: Principal
    ) : async Result.Result<Types.User, Text> {
        if (not (caller == principalId)) {
            return #err("Unauthorized Access. User upgrade has been rejected.");
        };

        if (not (caller == ADMINISTRATOR1 or caller == ADMINISTRATORLOCAL)) {
            return #err("Unauthorized State. User upgrade has been rejected.");
        };
        return usersManager.verifyUser(caller, userPrincipal);
    };

    public shared ({ caller }) func getAllUsers(
        principalId: Principal
    ) : async Result.Result<[Types.User], Text> {
        if (not (caller == principalId)) {
            return #err("Unauthorized Access. User fetching has been rejected.");
        };
        
        if (not (caller == ADMINISTRATOR1 or caller == ADMINISTRATOR2 or caller == ADMINISTRATORLOCAL)) {
            return #err("Unauthorized Access. User fetching has been rejected.");
        };
        return #ok(usersManager.getAllUsers());
    };
}