import Link from "next/link"

export const Header = () => {
    return (
        <header className="flex px2 py4">
            <div className="flex items-center justify-between w-full mx-auto max-w-7x1">
            <div>Next</div>
            <nav>
                <ul className="flex items-center justify-center gap-2">
                    <Link href={'/'}>Home</Link>
                    <Link href={'/posts'}>Posts</Link>
                    <Link href={'/dashboard'}>Dashboard</Link>
                    <Link href={'/contacts'}>Contact</Link>
                </ul>
            </nav>
            </div>
        </header>
    )
}