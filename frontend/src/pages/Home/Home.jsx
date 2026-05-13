import { Link } from "react-router-dom";


const Home = () => {

    return (

        <div className="bg-slate-100">

            {/* NAVBAR */}
            <nav className="bg-slate-950 text-white px-8 py-5 flex justify-between items-center sticky top-0 z-50">

                <h1 className="text-4xl font-bold text-green-400">
                    SmartBin
                </h1>


                <div className="flex gap-10 font-semibold">

                    <a href="#home" className="hover:text-green-400">
                        Home
                    </a>

                    <a href="#about" className="hover:text-green-400">
                        About
                    </a>

                    <a href="#working" className="hover:text-green-400">
                        Working
                    </a>

                    <a href="#features" className="hover:text-green-400">
                        Features
                    </a>

                    <a href="#blog" className="hover:text-green-400">
                        Blog
                    </a>

                    <a href="#contact" className="hover:text-green-400">
                        Contact
                    </a>

                </div>


                <Link
                    to="/login"
                    className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl transition"
                >
                    Login
                </Link>

            </nav>


            {/* HERO SECTION */}
            <section
                id="home"
                className="min-h-screen bg-gradient-to-r from-slate-950 to-slate-700 text-white flex items-center justify-center px-10"
            >

                <div className="grid md:grid-cols-2 gap-20 items-center">

                    <div>

                        <h1 className="text-6xl font-bold leading-tight mb-8">

                            Smart Waste Monitoring
                            <br />
                            for Smart Cities

                        </h1>


                        <p className="text-2xl text-slate-300 leading-relaxed">

                            Efficient waste collection using
                            intelligent monitoring,
                            worker tracking,
                            vehicle management,
                            and real-time cleaning operations.

                        </p>

                    </div>


                    <img
                        src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1200&auto=format&fit=crop"
                        alt="Smart Waste Bins"
                        className="rounded-3xl shadow-2xl w-[650px] h-[420px] object-cover"
                    />

                </div>

            </section>


            {/* ABOUT */}
            <section
                id="about"
                className="py-24 px-10 bg-white"
            >

                <div className="max-w-6xl mx-auto">

                    <h2 className="text-5xl font-bold mb-10 text-center">
                        About SmartBin
                    </h2>


                    <p className="text-xl text-slate-700 leading-loose text-center">

                        SmartBin is an intelligent waste
                        management platform designed for
                        smart cities. The system helps
                        municipal authorities monitor waste
                        levels, assign workers and vehicles,
                        track cleaning activities, and maintain
                        complete operational history. It
                        improves collection efficiency,
                        reduces overflowing bins, and enables
                        real-time waste monitoring through a
                        scalable digital platform.

                    </p>

                </div>

            </section>


            {/* WORKING */}
            <section
                id="working"
                className="py-24 px-10 bg-slate-100"
            >

                <div className="max-w-6xl mx-auto">

                    <h2 className="text-5xl font-bold mb-16 text-center">
                        How It Works
                    </h2>


                    <div className="grid md:grid-cols-4 gap-10">

                        <div className="bg-white p-8 rounded-3xl shadow-lg">

                            <h3 className="text-2xl font-bold mb-4">
                                1. Monitor Bins
                            </h3>

                            <p className="text-slate-600">
                                The system continuously monitors
                                waste bin fill levels and status.
                            </p>

                        </div>


                        <div className="bg-white p-8 rounded-3xl shadow-lg">

                            <h3 className="text-2xl font-bold mb-4">
                                2. Assign Workers
                            </h3>

                            <p className="text-slate-600">
                                Admin assigns workers and
                                vehicles to bins needing
                                cleaning.
                            </p>

                        </div>


                        <div className="bg-white p-8 rounded-3xl shadow-lg">

                            <h3 className="text-2xl font-bold mb-4">
                                3. Clean Waste
                            </h3>

                            <p className="text-slate-600">
                                Workers clean assigned bins
                                and update cleaning status.
                            </p>

                        </div>


                        <div className="bg-white p-8 rounded-3xl shadow-lg">

                            <h3 className="text-2xl font-bold mb-4">
                                4. Track History
                            </h3>

                            <p className="text-slate-600">
                                Admin monitors complete
                                operational history and reports.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* FEATURES */}
            <section
                id="features"
                className="py-24 px-10 bg-white"
            >

                <div className="max-w-6xl mx-auto">

                    <h2 className="text-5xl font-bold mb-16 text-center">
                        Key Features
                    </h2>


                    <div className="grid md:grid-cols-3 gap-10">

                        <div className="bg-slate-100 p-8 rounded-3xl shadow">

                            <h3 className="text-2xl font-bold mb-4">
                                Smart Monitoring
                            </h3>

                            <p className="text-slate-600">
                                Real-time fill level tracking
                                for efficient waste collection.
                            </p>

                        </div>


                        <div className="bg-slate-100 p-8 rounded-3xl shadow">

                            <h3 className="text-2xl font-bold mb-4">
                                Worker Management
                            </h3>

                            <p className="text-slate-600">
                                Assign tasks and monitor
                                worker activities effectively.
                            </p>

                        </div>


                        <div className="bg-slate-100 p-8 rounded-3xl shadow">

                            <h3 className="text-2xl font-bold mb-4">
                                Vehicle Tracking
                            </h3>

                            <p className="text-slate-600">
                                Manage collection vehicles
                                and optimize operations.
                            </p>

                        </div>


                        <div className="bg-slate-100 p-8 rounded-3xl shadow">

                            <h3 className="text-2xl font-bold mb-4">
                                Cleaning History
                            </h3>

                            <p className="text-slate-600">
                                Maintain permanent cleaning
                                logs with timestamps.
                            </p>

                        </div>


                        <div className="bg-slate-100 p-8 rounded-3xl shadow">

                            <h3 className="text-2xl font-bold mb-4">
                                Secure Authentication
                            </h3>

                            <p className="text-slate-600">
                                JWT-based admin and worker
                                authentication system.
                            </p>

                        </div>


                        <div className="bg-slate-100 p-8 rounded-3xl shadow">

                            <h3 className="text-2xl font-bold mb-4">
                                Smart City Ready
                            </h3>

                            <p className="text-slate-600">
                                Scalable architecture for
                                future IoT integration.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* BLOG */}
            <section
                id="blog"
                className="py-24 px-10 bg-slate-100"
            >

                <div className="max-w-5xl mx-auto">

                    <h2 className="text-5xl font-bold mb-12 text-center">
                        Blog
                    </h2>


                    <div className="bg-white rounded-3xl shadow-lg p-10">

                        <p className="text-xl leading-loose text-slate-700">

                            SmartBin is designed to transform
                            traditional waste management into
                            an intelligent and efficient digital
                            system. The platform helps city
                            authorities monitor waste bins,
                            assign workers, track vehicles,
                            and maintain real-time cleaning
                            history. The motivation behind this
                            project is to reduce overflowing
                            bins, improve urban cleanliness,
                            and create scalable smart-city
                            infrastructure. With role-based
                            authentication, operational
                            tracking, and modern dashboard
                            management, SmartBin demonstrates
                            how technology can improve public
                            sanitation systems effectively.

                        </p>

                    </div>

                </div>

            </section>


            {/* CONTACT */}
            <section
                id="contact"
                className="py-24 px-10 bg-slate-950 text-white"
            >

                <div className="max-w-5xl mx-auto text-center">

                    <h2 className="text-5xl font-bold mb-10">
                        Contact Us
                    </h2>


                    <p className="text-2xl text-slate-300 mb-6">
                        SmartBin Waste Management System
                    </p>

                    <p className="text-xl text-slate-400">
                        Email: smartbin@gmail.com
                    </p>

                    <p className="text-xl text-slate-400 mt-4">
                        Phone: +91 9876543210
                    </p>

                    <p className="text-xl text-slate-400 mt-4">
                        Moradabad, Uttar Pradesh, India
                    </p>

                </div>

            </section>

        </div>
    );
};

export default Home;