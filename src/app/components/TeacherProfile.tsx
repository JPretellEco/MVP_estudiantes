import { useParams, Link } from "react-router";
import { useState } from "react";
import { ArrowLeft, Star, ThumbsUp, ThumbsDown, Calendar, BookOpen, TrendingUp } from "lucide-react";
import { teachers, reviews } from "../data/mockData";
import { StarRating } from "./StarRating";

export function TeacherProfile() {
  const { id } = useParams();
  const teacher = teachers.find((t) => t.id === id);
  const teacherReviews = reviews.filter((r) => r.teacherId === id);

  const [newReview, setNewReview] = useState({
    rating: 5,
    subject: "",
    comment: "",
    difficulty: 3,
    wouldTakeAgain: true,
  });

  const [showForm, setShowForm] = useState(false);

  if (!teacher) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p>Docente no encontrado</p>
      </div>
    );
  }

  const avgDifficulty =
    teacherReviews.reduce((sum, r) => sum + r.difficulty, 0) / teacherReviews.length || 0;
  const wouldTakeAgainPercentage =
    (teacherReviews.filter((r) => r.wouldTakeAgain).length / teacherReviews.length) * 100 || 0;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - en producción esto se enviaría a Supabase
    alert("¡Reseña enviada! (Esta es una versión demo)");
    setShowForm(false);
    setNewReview({
      rating: 5,
      subject: "",
      comment: "",
      difficulty: 3,
      wouldTakeAgain: true,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="size-5" />
        <span>Volver a la lista</span>
      </Link>

      {/* Teacher Header */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <img
            src={teacher.imageUrl}
            alt={teacher.name}
            className="size-32 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {teacher.name}
            </h1>
            <p className="text-lg text-gray-600 mb-4">{teacher.department}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {teacher.subjects.map((subject) => (
                <span
                  key={subject}
                  className="px-4 py-2 bg-blue-50 text-blue-700 text-sm rounded-full font-medium"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>

          <div className="text-center bg-blue-50 rounded-xl p-6">
            <div className="text-5xl font-bold text-blue-600 mb-2">
              {teacher.rating.toFixed(1)}
            </div>
            <StarRating rating={teacher.rating} size={24} />
            <p className="text-sm text-gray-600 mt-2">
              {teacher.totalReviews} reseñas
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="size-6 text-orange-500" />
            <h3 className="font-semibold text-gray-900">Dificultad</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {avgDifficulty.toFixed(1)}/5
          </div>
          <p className="text-sm text-gray-500">Nivel de exigencia</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <ThumbsUp className="size-6 text-green-500" />
            <h3 className="font-semibold text-gray-900">Recomendación</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {wouldTakeAgainPercentage.toFixed(0)}%
          </div>
          <p className="text-sm text-gray-500">Tomarían de nuevo</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="size-6 text-blue-500" />
            <h3 className="font-semibold text-gray-900">Materias</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {teacher.subjects.length}
          </div>
          <p className="text-sm text-gray-500">Cursos diferentes</p>
        </div>
      </div>

      {/* Add Review Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mb-6"
        >
          Escribir una reseña
        </button>
      )}

      {/* Review Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Escribe tu reseña
          </h2>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calificación
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating })}
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                  >
                    <Star
                      className={`size-8 ${
                        rating <= newReview.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Materia
              </label>
              <select
                value={newReview.subject}
                onChange={(e) =>
                  setNewReview({ ...newReview, subject: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">Selecciona una materia</option>
                {teacher.subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dificultad (1-5)
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={newReview.difficulty}
                onChange={(e) =>
                  setNewReview({ ...newReview, difficulty: parseInt(e.target.value) })
                }
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Muy fácil</span>
                <span className="font-medium text-gray-900">{newReview.difficulty}</span>
                <span>Muy difícil</span>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newReview.wouldTakeAgain}
                  onChange={(e) =>
                    setNewReview({ ...newReview, wouldTakeAgain: e.target.checked })
                  }
                  className="size-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-700">
                  Tomaría otra materia con este docente
                </span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comentario
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                required
                rows={4}
                placeholder="Comparte tu experiencia..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Publicar reseña
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Reseñas</h2>
        {teacherReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <StarRating rating={review.rating} size={18} />
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="font-medium text-gray-900">{review.studentName}</p>
              </div>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                {review.subject}
              </span>
            </div>

            <p className="text-gray-700 mb-3">{review.comment}</p>

            <div className="flex gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <TrendingUp className="size-4" />
                <span>Dificultad: {review.difficulty}/5</span>
              </div>
              <div className="flex items-center gap-1">
                {review.wouldTakeAgain ? (
                  <>
                    <ThumbsUp className="size-4 text-green-600" />
                    <span className="text-green-600">Tomaría de nuevo</span>
                  </>
                ) : (
                  <>
                    <ThumbsDown className="size-4 text-red-600" />
                    <span className="text-red-600">No tomaría de nuevo</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
