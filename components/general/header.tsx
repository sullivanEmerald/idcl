import GetStarted from "./getStarted";
import Logo from "./logo";
import Navigation from "./navigation";

export default function Header() {
    return (
        <header className="
        w-full
        flex items-center justify-between
        px-[120px] py-[17px]
        bg-white bg-opacity-80
        backdrop-blur-[14.4px]
        border-b border-opacity-10 border-black
        shadow-[3px_4px_16px_0px_rgba(88,124,88,0.02)]
        sticky top-0 z-50
        h-[69px]
      ">
            <Logo />
            <Navigation />
            <GetStarted />

        </header>
    )
}