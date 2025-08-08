type Props = { params: { id: string } };

export default function BoardGameDetailPage({ params }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Board Game ID: {params.id}</h1>
    </div>
  );
}
