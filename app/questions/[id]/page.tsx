type Props = { params: { id: string } };

export default function QuestionDetailPage({ params }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Question ID: {params.id}</h1>
    </div>
  );
}
