import Link from "next/link";
import "./home.css";

export default function Home() {
  return (
    <main className="home">

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">

          <p className="hero-label">
            Welcome to My Store
          </p>

          <h1 className="hero-title">
            Everything you need,
            <span>all in one place.</span>
          </h1>

          <p className="hero-description">
            Discover great products, manage your orders, and enjoy a simple
            shopping experience built for you.
          </p>

          <div className="hero-actions">

            <Link
              href="/login"
              className="button button-primary"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="button button-secondary"
            >
              Create Account
            </Link>

            <Link
              href="/products"
              className="button button-ghost"
            >
              Explore Products →
            </Link>

          </div>

        </div>
      </section>

      {/* Features */}
      <section className="features">

        <div className="features-container">

          <div className="features-heading">
            <h2>Why My Store?</h2>

            <p>
              Everything you need for a simple shopping experience.
            </p>
          </div>

          <div className="feature-grid">

            <div className="feature-card">
              <div className="feature-icon">🛍️</div>

              <h3>Great Products</h3>

              <p>
                Browse a collection of products and find something you love.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📦</div>

              <h3>Easy Orders</h3>

              <p>
                Keep track of your purchases and view your order history.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>

              <h3>Secure Account</h3>

              <p>
                Manage your account, address, cart, and checkout in one place.
              </p>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}