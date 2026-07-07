'use server';

import { redirect } from "next/navigation";
import { auth, signIn ,signOut} from "./auth";
import { getBookings } from "./data-service";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";


export async function updateGuest(formData){


    const session = await auth();

    if(!session) throw new Error("You must be logged in");



    const nationalID = formData.get('nationalID');

    const [nationality , countryFlag] = formData.get('nationality').split('%');


        const nationalIdRegex = /^[a-zA-Z0-9]{1,12}$/;

            if (!nationalIdRegex.test(nationalID)) {
  throw new Error("Please provide a valid national ID");
}

    const updateData = {nationality,countryFlag,nationalID};



      const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId)
    

if (error) {
  throw new Error("Guest could not be updated");

  revalidatePath('/account/profile');
}

revalidatePath("/account/profile");




     


}


export async function createBooking(bookingData,formData) {


      const session = await auth();

        if(!session) throw new Error("You must be logged in");


        Object.entries(formData.entries());

        const  newBooking = {
        
          ...bookingData,

          
          guestId:session.user.guestId,
          numGuests:Number(formData.get('numGuests')),
          observations:formData.get('observations').slice(0,1000),
          extrasPrice:0,
          totalPrice:bookingData.cabinPrice,
          isPaid:false,
          hasBreakfast:false,

        }



          const { error } = await supabase
    .from('bookings')
    .insert([newBooking])
    // So that the newly created object gets returned!
    

  if (error) {
  throw new Error(error.message);
}
   

  revalidatePath(`/cabins/${bookingData.cabinId}`);
    redirect('/thankYou')
}



export async function deleteBooking(bookingId){


    
    const session = await auth();

        if(!session) throw new Error("You must be logged in");


    const guestBookings = await getBookings(session.user.guestId);

    const guestBookingIds = guestBookings.map((booking)=>booking.id);

    if(!guestBookingIds.includes(bookingId)) throw new Error("You are not allowed to delete this booking")




     const {  error } = await supabase.from('bookings').delete().eq('id', bookingId);

if (error) {
  throw new Error("Booking could not be deleted");
}
  revalidatePath('/account/reservations')



  }

  export async function updateBooking(formData){


      //1 Authentication
    const session = await auth();
    
        if(!session) throw new Error("You must be logged in");

          //2 Authorization

                  const bookingId = Number(formData.get('bookingId'));


    const guestBookings = await getBookings(session.user.guestId);

    const guestBookingIds = guestBookings.map((booking)=>booking.id);

    if(!guestBookingIds.includes(bookingId)) throw new Error("You are not allowed to update this booking")

        //3 bulding update data

        const updateData = {
             numGuests: Number(formData.get('numGuests')),
             observations: formData.get('observations').slice(0,1000),


        }



        //4 mutation

     const { error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', bookingId)
    .select()
    .single();

    //5 error handling

  if (error) {
    throw new Error('Booking could not be updated');

  }

  //6 revalidation 

  revalidatePath(`/account/reservations/edit/${bookingId}`);


  revalidatePath('/account/reservations');

      redirect('/account/reservations')

  }

export async function signInActionWithGoogle(){


    await signIn('google',{redirectTo:'/account'});
}


export async function signInActionWithGitHub(){


    await signIn('github',{redirectTo:'/account'})
}





export async function signOutAction(){


    await signOut({redirectTo:'/'})
}