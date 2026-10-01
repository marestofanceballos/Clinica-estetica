import PageHeader from "../components/PageHeader/PageHeader";
import AppointmentForm from "../components/AppointmentForm/AppointmentForm";
import "../styles/turnos.css";

export default function Turnos() {
  return (
    <div className="turnos-page">
      <PageHeader
        eyebrow="Turnos"
        title="Reservá tu consulta de evaluación"
        lede="Completá tus datos y elegí el tratamiento de tu interés. Te contactaremos para confirmar día y horario."
      />

      <section className="section pt-0">
        <div className="container-narrow">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <AppointmentForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
