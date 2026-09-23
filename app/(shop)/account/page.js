import { requireUser } from "../../lib/auth";
import styles from "./account.module.css";
import EditProfile from "./EditProfile";
import prisma from "../../lib/prisma";
import AddAddress from "./AddAddress";
import AddressCard from "./AddressCard";
export default async function AccountPage({ searchParams }) {
    const params = await searchParams;
const returnTo = params.returnTo;
    const user = await requireUser();
    const addresses = await prisma.address.findMany({
    where: {
        userId: user.id,
    },
    orderBy: {
        createdAt: "desc",
    },
});

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <p className={styles.eyebrow}>MY ACCOUNT</p>

                <h1 className={styles.title}>
                    Hey {user.name} 👋
                </h1>

                <p className={styles.subtitle}>
                    Manage your profile and keep your account details up to date.
                </p>
            </header>

            <section className={styles.card}>
                <div className={styles.avatar}>
                    {user.name.charAt(0).toUpperCase()}
                </div>

                <div className={styles.details}>
                    <div className={styles.detail}>
                        <span>Name</span>
                        <strong>{user.name}</strong>
                    </div>

                    <div className={styles.detail}>
                        <span>Email</span>
                        <strong>{user.email}</strong>
                    </div>

                    <div className={styles.detail}>
                        <span>Member since</span>
                        <strong>
                            {new Date(user.createdAt).toLocaleDateString()}
                        </strong>
                    </div>
                </div>
            </section>
            <EditProfile user={user} />
            <section className={styles.addressSection}>
    <div className={styles.sectionHeader}>
        <div>
            <p className={styles.eyebrow}>DELIVERY</p>
            <h2 className={styles.sectionTitle}>
                Saved Addresses 📍
            </h2>
        </div>
    </div>

    {addresses.length === 0 ? (
        <div className={styles.emptyAddress}>
            <div className={styles.emptyIcon}>📍</div>

            <h3>No saved addresses</h3>

            <p>
                Add your Home or College address for faster checkout.
            </p>
        </div>
    ) : (
        <div className={styles.addressGrid}>
            {addresses.map((address) => (
                <AddressCard
                    key={address.id}
                    address={address}
                />
            ))}
        </div>
    )}

  <AddAddress returnTo={returnTo} />
</section>
        </main>
    );
}