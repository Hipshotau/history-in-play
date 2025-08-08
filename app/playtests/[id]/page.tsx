type Props = { params: { id: string } };

export default function PlaytestDetailPage({ params }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Playtest ID: {params.id}</h1>
    </div>
  );
}
