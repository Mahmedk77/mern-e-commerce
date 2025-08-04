import { assets } from "../assets/assets"

const Footer = () => {
  return (
    <div>
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-40 text-sm my-10">
        <div >
            <img src={assets.logo} alt="logo image in footer at home" className="mb-5 w-32" />
            <p className="w-full md:w-2/3 text-gray-600">
            We’re committed to bringing you real value through everything we do.
            From content to service, quality is our promise.
            Stay connected — updates, insights, and more are just a click away.
            </p>
        </div>
        <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>+92-3446130068</li>
                <li>mak.212601@gmail.com</li>
            </ul>
        </div>
    </div>
    <div >
            <hr />
            <p className="py-5 text-center text-sm">Copyright 2025@ forever.com -All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer
