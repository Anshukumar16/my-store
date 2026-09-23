import { notFound } from "next/navigation";
import { requireUser } from "../../../../lib/auth";
import prisma from "../../../../lib/prisma";
import EditAddress from "../../EditAddress";

export default async function EditAddressPage({ params }) {
    const user = await requireUser();

    const { id } = await params;

    const address = await prisma.address.findFirst({
        where: {
            id: Number(id),
            userId: user.id,
        },
    });

    if (!address) {
        notFound();
    }

    return <EditAddress address={address} />;
}