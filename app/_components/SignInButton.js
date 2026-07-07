import Image from "next/image";
import { signInActionWithGitHub,signInActionWithGoogle } from "../_lib/action";

function  SignInButton() {
  return (<>
 <form action={signInActionWithGoogle}>
    <button className='flex items-center rounded-md gap-6 text-lg border hover:bg-primary-900 transition-all duration-200 hover:border-primary-100 border-primary-700 px-10 py-4 font-medium'>
      <Image
        src='https://authjs.dev/img/providers/google.svg'
        alt='Google logo'
        height='40'
        width='40'
      />

       
      <span>Continue with Google</span>
    </button>


</form>
     <form action={signInActionWithGitHub}>


<button className='flex items-center gap-6 rounded-md text-lg border hover:bg-primary-900 transition-all duration-200 hover:border-primary-100 border-primary-700 px-10 py-4 font-medium'>
   <Image
        src='https://authjs.dev/img/providers/github.svg'
        alt='GitHub logo'
        height='40'
        width='40'
      />

       
      <span>Continue with GitHub</span>
    </button>
     </form>

   </>
  );
}

export default SignInButton;
  