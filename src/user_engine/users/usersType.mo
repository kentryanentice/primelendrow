module {

    public type UserType = {
        #Pending;
        #Verifying;
        #User;
        #Admin;
    };

    public type UserLevel = {
        #L1;
        #L2;
        #L100;
    };

    public type UserBadge = {
        #Normal;
        #Verified;
        #Administrator;
    };

    public type User = {
        principalId: Principal;
        profile: Text;
        primaryId: Blob;
        username: Text;
        firstName: Text;
        middleName: Text;
        lastName: Text;
        mobile: Text;
        userType: UserType;
        userLevel: UserLevel;
        userBadge: UserBadge;
        createdAt: Int;
        updatedAt: Int;
    };
}