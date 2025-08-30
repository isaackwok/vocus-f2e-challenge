type AbstractProps = {
  title: string;
  abstract: string;
};

export function Abstract({ title, abstract }: AbstractProps) {
  return (
    <div className="flex flex-row gap-7">
      <div className="flex flex-grow flex-col gap-[15px] *:leading-6">
        <h2 className="text-lg font-bold text-secondary-dark">{title}</h2>
        <p className="line-clamp-3 min-h-18 text-sm text-gray-2">{abstract}</p>
      </div>
    </div>
  );
}
