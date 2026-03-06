import { buttonBaseClass, secondaryButtonClass } from "@/components/ui/Buttons";
import { cn } from "@/lib/utils/cn";

type WhatsappButtonProps = {
  url: string;
  label?: string;
};

export function WhatsappButton({ url, label = "Enviar por WhatsApp" }: WhatsappButtonProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={cn(buttonBaseClass, secondaryButtonClass, "px-4 py-2")}
    >
      {label}
    </a>
  );
}
