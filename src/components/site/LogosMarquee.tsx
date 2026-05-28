import logoHopla from "@/assets/logo-hopla-footer.svg";
import logoLudinautes from "@/assets/ludinautes logo .png";
import logoCallkom from "@/assets/callkom_logo.jpeg";
import logoGLS from "@/assets/gls logo.png";
import logoABS from "@/assets/abs logo.png";
import logoQSM from "@/assets/QSM-Consulting-logo.png";
import logoMozart from "@/assets/MOZART CONSEIL logo .png";
import logoSoyo from "@/assets/Logo_SOYO.png";
import logoHallyu from "@/assets/Logo-long_HALLYU-SKIN-6.png";
import logoSolenya from "@/assets/logo_transparent solenya.svg";
import logoTwoManta from "@/assets/logo two manta.webp";
import logoCC from "@/assets/logo c&c.png.png";
import logoIanova from "@/assets/ianova logo carre.png";
import logoPaypersafe from "@/assets/paypersafe logo.jpg";
import logoCEM from "@/assets/LOGO CEM PNG.png";
import logoAB4C from "@/assets/AB4C logooo.png";
import logoDimensionA from "@/assets/Logo Dimension A.png";
import logoElytsmart from "@/assets/Logo-fichier-source-ELYTSMART-avec-accroche.png";

const LOGOS = [
  { src: logoHopla, alt: "Hopla Cloud" },
  { src: logoLudinautes, alt: "Ludinautes" },
  { src: logoCallkom, alt: "CallKom" },
  { src: logoGLS, alt: "GLS Vending" },
  { src: logoABS, alt: "ABS Formation" },
  { src: logoQSM, alt: "QSM Consulting" },
  { src: logoMozart, alt: "Mozart Conseil" },
  { src: logoSoyo, alt: "Soyo" },
  { src: logoHallyu, alt: "Hallyu Skin" },
  { src: logoSolenya, alt: "Solenya" },
  { src: logoTwoManta, alt: "Two Manta" },
  { src: logoCC, alt: "C&C" },
  { src: logoIanova, alt: "Ianova" },
  { src: logoPaypersafe, alt: "PayPerSafe" },
  { src: logoCEM, alt: "CEM" },
  { src: logoAB4C, alt: "AB4C" },
  { src: logoDimensionA, alt: "Dimension A" },
  { src: logoElytsmart, alt: "Elytsmart" },
];

export function LogosMarquee() {
  return (
    <section className="overflow-hidden py-16">
      <div className="mx-auto mb-12 max-w-6xl px-6 text-center">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          (clients)
        </p>
        <h2 className="font-display text-4xl font-bold md:text-5xl">
          Ils m'ont fait{" "}
          <span className="font-serif italic text-primary">confiance</span>
        </h2>
      </div>
      <div className="animate-marquee flex w-max gap-16 items-center">
        {[0, 1].map((group) => (
          <div className="flex gap-16 items-center" key={group}>
            {LOGOS.map((logo) => (
              <img
                key={logo.alt + group}
                src={logo.src}
                alt={logo.alt}
                className="h-12 w-auto max-w-[160px] object-contain"
                loading="lazy"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
