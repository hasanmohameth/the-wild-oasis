import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {

  const session =  await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link href="/cabins" className="hover:text-accent-400    relative
    after:absolute
    after:left-0
    after:bottom-0
    after:h-[2px]
    after:w-0
    after:bg-current
    after:transition-all
    after:duration-300
    hover:after:w-full
    hover:text-accent-400 hover:duration-300 transition-all ">
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-400    relative
    after:absolute
    after:left-0
    after:bottom-0
    after:h-[2px]
    after:w-0
    after:bg-current
    after:transition-all
    after:duration-300
    hover:after:w-full
    hover:text-accent-400 hover:duration-300 transition-all">
            About
          </Link>
        </li>
        <li>
        { session?.user.image ? <Link
            href="/account"
            className=" flex items-center gap-4
            hover:text-accent-400      relative
    after:absolute
    after:left-0
    after:bottom-0
    after:h-[2px]
    after:w-0
    after:bg-current
    after:transition-all
    after:duration-500
    hover:after:w-full
    hover:text-accent-400 hover:duration-300 transition-all"
          >
            <img 
            className="h-8 rounded-full" 
            src={session.user.image} 
            alt={session.user.name}
            referrerPolicy="no-referrer"
            />

           <span> Guest area </span>
          </Link> : <Link
            href="/account"
            className="hover:text-accent-400      relative
    after:absolute
    after:left-0
    after:bottom-0
    after:h-[2px]
    after:w-0
    after:bg-current
    after:transition-all
    after:duration-500
    hover:after:w-full
    hover:text-accent-400 hover:duration-300 transition-all"
          >
            Guest area
          </Link>}
        </li>
      </ul>
    </nav>
  );
}
