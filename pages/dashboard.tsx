import { useSession } from "next-auth/react";



export default function Dashboard(){
    const { data: session, status } = useSession();
}