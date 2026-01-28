
import AppointmentForm from "../components/ApointmentForm";
import Hero from "../components/Hero";

const Appointment=()=>{
  return (
    <>
    <Hero title={"Schedule Your Appointment | CuraLink HealthCare"} imageUrl={"/signin.png"} />
    <AppointmentForm/>

    </>

  );
};
export default Appointment;
