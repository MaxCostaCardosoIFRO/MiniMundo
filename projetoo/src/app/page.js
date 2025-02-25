import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
       <h1 className={styles.title}>Bem vindo à clínica saudável!</h1>
       <p className={styles.paragrafo}>Nossa equipe de profissionais altamente qualificados 
        está pronta para cuidar da sua saúde com dedicação e excelência.
         Oferecemos um atendimento humanizado, tecnologia de ponta e uma 
        ampla gama de especialidades médicas para garantir seu bem-estar.</p>
    </div>
  );
}
