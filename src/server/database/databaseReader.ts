import { User, UserStatus } from "../manager/UserPlayerManager";

export default class DatabaseReader {
    loadUsers(): User[] {
        return [
            {
                username: "user1",
                password: "1234",
                status: UserStatus.OFFLINE,
                id: 0,
            },
            {
                username: "user2",
                password: "1234",
                status: UserStatus.OFFLINE,
                id: 1,
            },
        ];
    }

    getRunningId(): number {
        return 1;
    }
}
