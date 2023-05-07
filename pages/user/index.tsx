import { ReactElement } from "react";
import SideBar from "@/components/sideBar";
import { useRouter } from "next/router";

export const UserDisp = () => {
    
    const router = useRouter();
    const query = router.query;
    return (
        <div>
            {query.user}<br/>
            {query.birth}
            ""
            user
        </div>
    )
}

UserDisp.getLayout = function getLayout(page: ReactElement) {
    return (
        // <UserGuard>
            <div className="flex">
                <SideBar/>{page}
            </div>
        // </UserGuard>
    )
}

export default UserDisp
;