import { Link } from "react-router-dom";

const Faq = () => {
  const faqs = [
    {
      question: "What is Auction Avenue?",
      answer:
        "Auction Avenue is a real-time online auction platform designed specifically for the Nepali market. It allows users to bid on a variety of products in real-time and securely complete transactions using local payment methods like Khalti and eSewa.",
    },
    {
      question: "How do I create an account?",
      answer:
        "To create an account, click on the 'Sign Up' button at the top right of the homepage. Fill out the required details, verify your email address, and you'll be ready to participate in auctions.",
    },
    {
      question: "How do I place a bid?",
      answer:
        "To place a bid, simply log in to your account, navigate to the product you're interested in, and enter your bid amount. Make sure your bid is higher than the current bid to qualify.",
    },
    {
      question: "What happens if I win an auction?",
      answer:
        "If you win an auction, you'll receive a notification with the details of your winning bid. You will then need to complete the payment and provide shipping information to finalize the transaction.",
    },
    {
      question: "What payment methods are supported?",
      answer:
        "Auction Avenue supports local payment methods such as Khalti, eSewa, and bank transfers to ensure secure and convenient transactions.",
    },
    {
      question: "Can I sell my items on Auction Avenue?",
      answer:
        "Yes, you can list items for sale by registering as a seller. Once approved, you can start creating listings and manage your auctions through the seller dashboard.",
    },
    {
      question: "How is my personal information protected?",
      answer:
        "We take the security of your personal information seriously by using encryption, secure servers, and limiting access to authorized personnel only. Refer to our Privacy Policy for more details.",
    },
    {
      question: "What are the fees for using Auction Avenue?",
      answer:
        "Auction Avenue charges a small fee for listing items and a commission on completed sales. Specific fees depend on the category and value of the item being sold.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can contact our customer support team by using the 'Contact Us' form on our website or by emailing support@auctionavenue.com. We're here to help!",
    },
  ];

  return (
    <div className="text-white">
      <div className="flex items-center justify-center flex-col h-[280px] bg-hero-img bg-cover">
        <h1 className="text-center font-bold text-3xl">Frequently Asked Questions</h1>
        <div className="flex gap-2 font-medium pt-2">
          <Link
            to="/"
            className=" no-underline hover:text-theme-color transition-all"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-theme-color">FAQs</span>
        </div>
      </div>
      <div className="px-4 py-20 flex flex-col m-auto gap-10 max-w-[1300px]">
        {faqs.map((faq, index) => (
          <div key={index}>
            <h2 className="font-bold text-2xl text-heading-color">
              {faq.question}
            </h2>
            <p className="text-body-text-color pt-5">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
