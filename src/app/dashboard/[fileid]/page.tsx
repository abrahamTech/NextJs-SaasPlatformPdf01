import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";

interface PageProps {
    params: {
        fileid: string
    }
}

const Page = async ({params}: PageProps) => {

    const {fileid} = params;

    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fileid}`)

    //Make DB call
    const file = await db.file.findFirst({
        where: {
            id: fileid,
            userId: user.id
        }
    })

    if(!file) notFound()

    return (
        <div>File View ID: {fileid}</div>
    );
}

export default Page;