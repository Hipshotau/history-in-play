type Props = { params: { id: string } };

export default function EventDetailPage({ params }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Event ID: {params.id}</h1>
    </div>
  );
}
