import { useState } from "react";
import { X } from "lucide-react";

interface FileViewerProps {
  fileName: string;
  fileType: string;
  onClose: () => void;
}

export function FileViewer({ fileName, fileType, onClose }: FileViewerProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 truncate flex-1">
            {fileName}
          </h2>
          <button
            onClick={onClose}
            className="ml-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8 bg-gray-50">
          <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Vista previa del archivo
                </h3>
                <p className="text-gray-600 mb-6">
                  {fileName}
                </p>
                <div className="bg-blue-50 rounded-lg p-6 text-left">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Contenido de ejemplo:
                  </h4>
                  <div className="space-y-3 text-sm text-gray-700">
                    <p>
                      <strong>1. Pregunta 1:</strong> Explique el concepto de
                      complejidad algorítmica y proporcione ejemplos de O(n) y O(log n).
                    </p>
                    <p>
                      <strong>2. Pregunta 2:</strong> Implemente un algoritmo de
                      ordenamiento utilizando el método de selección.
                    </p>
                    <p>
                      <strong>3. Pregunta 3:</strong> Analice las diferencias entre
                      estructuras de datos lineales y no lineales.
                    </p>
                    <p>
                      <strong>4. Problema práctico:</strong> Dado un array desordenado,
                      escriba un programa que encuentre el elemento más frecuente.
                    </p>
                    <p>
                      <strong>5. Pregunta teórica:</strong> Describa las ventajas y
                      desventajas de usar recursión vs iteración.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-6">
                  * Esta es una vista previa de ejemplo. En producción, aquí se
                  mostraría el contenido real del archivo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
