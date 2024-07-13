import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { GiCheckMark } from "react-icons/gi";

export default function Page() {
  return (
    <div className="container mx-auto bg-gradient-to-b from-neutral-800 to-neutral-600 text-white  grid grid-cols-1 lg:grid-cols-2 ">
      <section>
        <ScrollArea className="h-[90vh] text-center px-4 py-4">
          <h1 className="text-2xl lg:text-4xl font-bold">
            Welcome to <Link href="/">
              <span className="text-black">Shop<span className="text-orange-600">wave</span></span>!
            </Link>
          </h1>
          <article>
            <span className="text-2xl lg:text-3xl font-bold text-orange-600">At Shopwave</span>, we are passionate about bringing you the best online shopping experience. Founded with the vision of creating a one-stop destination for all your shopping needs, we strive to offer a wide range of high-quality products at competitive prices.
          </article>
          <article>
            <p className="text-2xl lg:text-3xl font-bold text-orange-600">Our Story</p>
            Shopwave was born out of a desire to revolutionize the way people shop online. With a team of dedicated professionals, we set out to create a platform that is user-friendly, reliable, and offers an extensive selection of products. From fashion and electronics to home goods and beauty products, we've got something for everyone.
          </article>

          <article>
            <p className="text-2xl lg:text-3xl font-bold text-orange-600"  >Our Mission</p>
            Our mission is simple: to provide an exceptional shopping experience that exceeds our customers' expectations. We believe in the power of choice, convenience, and quality. By partnering with top brands and trusted suppliers, we ensure that every product on our site meets our high standards.
          </article>

          <article>
            <p className="text-2xl lg:text-3xl font-bold text-orange-600">
              Why Shop with Us?
            </p>

            Quality Products: We offer a carefully curated selection of products from reputable brands.
            Competitive Prices: Enjoy great deals and discounts on your favorite items.
            Fast Shipping: Get your orders delivered quickly and efficiently.
            Customer Support: Our friendly and knowledgeable customer support team is here to help you with any questions or concerns.
            Secure Shopping: Shop with confidence knowing that your information is safe and secure.
          </article>
          <article>
            <p className="text-2xl lg:text-3xl font-bold text-orange-600">
              Our Commitment
            </p>
            We are committed to providing a seamless shopping experience from start to finish. Our team is always working to improve our platform and services to better serve you. Whether you are looking for the latest trends, everyday essentials, or unique finds, Shopwave is here to meet your needs.
          </article>

          <article>
            <p className="text-2xl lg:text-3xl font-bold text-orange-600">
              Join Our Community
            </p>
            Stay connected with us through our social media channels and newsletter. Be the first to know about new arrivals, exclusive offers, and exciting events. At Shopwave, we value our customers and strive to build a vibrant community of happy shoppers.
          </article>

          <footer>
            Thank you for choosing Shopwave. Happy shopping!
          </footer>

        </ScrollArea>
      </section>
      <section className="h-[90vh] text-center py-4">
        <article className="text-2xl lg:text-3xl font-bold">
          Tech <span className="text-orange-600">Stack</span>
        </article>
        <article className="text-start flex justify-center mt-4">
          <ul className="lg:space-y-2 text-lg lg:text-xl">
            <li className="flex gap-2 items-center"><GiCheckMark className="text-orange-600" /> Next.js</li>
            <li className="flex gap-2 items-center"><GiCheckMark className="text-orange-600" /> Tailwind CSS</li>
            <li className="flex gap-2 items-center"><GiCheckMark className="text-orange-600" /> Shadcn-ui</li>
            <li className="flex gap-2 items-center"><GiCheckMark className="text-orange-600" /> v0.dev</li>
            <li className="flex gap-2 items-center"><GiCheckMark className="text-orange-600" /> MongoDB Atlas</li>
            <li className="flex gap-2 items-center"><GiCheckMark className="text-orange-600" /> Vercel</li>
          </ul>
        </article>

      </section>
    </div>
  )
}
