import Navbar from "../components/Navbar";
import { requireUser } from "../lib/auth";
import { getCartCount } from "../lib/cart-actions";

export default async function ShopLayout({ children }) {
   const user = await requireUser();

    let totalItems = 0;

    if (user) {
        totalItems = await getCartCount(user.id);
    }

    return (
        <>
            <Navbar
                user={user}
                totalItems={totalItems}
            />

            {children}
        </>
    );
}