import warningIcon from '/icons/warning.png';

export default function AlertBanner({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded shadow">
      <img src={warningIcon} alt="warning" className="w-6 h-6" />
      <span className="font-semibold">{message}</span>
    </div>
  );
}
