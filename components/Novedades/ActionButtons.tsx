import { Download, ShareNetwork } from 'phosphor-react';
import toast from 'react-hot-toast';
import { MouseEventHandler } from 'react';

const COPY_URL_SUCCESS_MESSAGE = 'Copiado al portapapeles!';
const COPY_URL_ERROR_MESSAGE = 'Hubo un error intentelo nuevamente';

type Props = { slug: string; printNovedad?: () => void };

const ActionButtons = ({ slug, printNovedad }: Props) => {
  const handleShareClick: MouseEventHandler<SVGElement> = async (e) => {
    e.preventDefault();
    try {
      // todo put baseUrl as env var?
      await navigator.clipboard.writeText(`${window.location.origin}/novedades/${slug}`);
      toast.success(COPY_URL_SUCCESS_MESSAGE, { position: 'bottom-center', duration: 3000 });
    } catch (err) {
      toast.error(COPY_URL_ERROR_MESSAGE, { position: 'bottom-center', duration: 3000 });
    }
  };

  const handleDownloadClick: MouseEventHandler<SVGElement> = (e) => {
    e.preventDefault();
    printNovedad?.();
  };

  return (
    <div className="flex gap-3">
      {printNovedad && <Download size={44} className="icon-button print:opacity-0" onClick={handleDownloadClick} />}
      <ShareNetwork size={44} className="icon-button print:opacity-0" onClick={handleShareClick} />
    </div>
  );
};

export default ActionButtons;
