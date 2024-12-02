const Footer = () => {
    return (
        <footer className="fixed bottom-0 w-full pt-8 mt-16 bg-white border-t border-gray-100">
            <p className="text-center text-gray-500 text-xs/relaxed">
                © Company 2024. All rights reserved.
                <br />
                Created with
                <a href="#" className="text-gray-700 underline transition hover:text-gray-700/75">Ruby on Rails</a>
                and
                <a href="#" className="text-gray-700 underline transition hover:text-gray-700/75">React</a>
            </p>
        </footer>
    )
}

export default Footer