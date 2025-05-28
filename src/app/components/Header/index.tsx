import Link from "next/link"

export const Header = () => {
    return (
        <header className="flex px2 py4">
            <div className="flex items-center justify-between w-full mx-auto max-w-7x1">
            <div>Ações</div>
            <nav>
                <ul className="flex items-center justify-center gap-2">
                    <Link href={'/'}>Home</Link>
                    <Link href={'/finance'}>Finance</Link>
                </ul>
            </nav>
            </div>
        </header>
    )
}