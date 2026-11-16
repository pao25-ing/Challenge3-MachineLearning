/* Datos del proyecto: results/cnn y notebook 01. Sin métricas simuladas. */
(function (root) {
"use strict";
const data = {
  "models": [
    {
      "experimento": "01_base",
      "balanced_accuracy": 0.7484653048392147,
      "accuracy": 0.74847412109375,
      "precision": 0.753004171595791,
      "recall": 0.7388356038853932,
      "f1": 0.7458526056120875,
      "roc_auc": 0.8288122191382546,
      "epocas_ejecutadas": 5,
      "mejor_epoca": 2,
      "segundos": 198.44,
      "key": "01_base",
      "name": "Base",
      "tag": "El punto de partida",
      "description": "Dos bloques de convolución y reducción de tamaño. Sirve como referencia para evaluar los cambios.",
      "architecture": "Conv 16 → Pool → Conv 32 → Pool → Promedio global → Dense 32 → Sigmoid",
      "maxEpochs": 10,
      "public": 0.73509,
      "selected": true
    },
    {
      "experimento": "02_dropout",
      "balanced_accuracy": 0.7486889938079699,
      "accuracy": 0.74871826171875,
      "precision": 0.76534672842325,
      "recall": 0.7167206304600159,
      "f1": 0.7402359770332513,
      "roc_auc": 0.8315960303288208,
      "epocas_ejecutadas": 5,
      "mejor_epoca": 2,
      "segundos": 191.38,
      "key": "02_dropout",
      "name": "Dropout",
      "tag": "La mejor validación",
      "description": "Añade Dropout de 0,3 antes de la salida. Durante el entrenamiento desactiva al azar parte de las activaciones para reducir la dependencia de unas pocas señales.",
      "architecture": "Base + Dropout 0,3 antes de la salida",
      "maxEpochs": 12,
      "public": 0.7368,
      "selected": true
    },
    {
      "experimento": "03_aumento",
      "balanced_accuracy": 0.7081442878859667,
      "accuracy": 0.708282470703125,
      "precision": 0.7978481455563331,
      "recall": 0.5572118027979718,
      "f1": 0.6561634473580087,
      "roc_auc": 0.7884032293808707,
      "epocas_ejecutadas": 5,
      "mejor_epoca": 2,
      "segundos": 223.6,
      "key": "03_aumento",
      "name": "Aumento de datos",
      "tag": "Más variaciones de imagen",
      "description": "Añade giros de hasta 0,1 vueltas e inversiones horizontales y verticales durante el entrenamiento.",
      "architecture": "Base + Dropout + giros e inversiones",
      "maxEpochs": 12,
      "public": 0.67441,
      "selected": false
    },
    {
      "experimento": "04_profunda",
      "balanced_accuracy": 0.6987276755784713,
      "accuracy": 0.6988525390625,
      "precision": 0.7729448316399362,
      "recall": 0.5623434540900483,
      "f1": 0.651036141169814,
      "roc_auc": 0.7856302159532852,
      "epocas_ejecutadas": 4,
      "mejor_epoca": 1,
      "segundos": 454.23,
      "key": "04_profunda",
      "name": "Más profunda",
      "tag": "Un bloque adicional",
      "description": "Usa tres bloques con 32, 64 y 128 filtros. También incluye aumento de datos y Dropout.",
      "architecture": "Conv 32 → Pool → Conv 64 → Pool → Conv 128 → Pool → Promedio global → Dense → Dropout → Sigmoid",
      "maxEpochs": 15,
      "public": 0.67547,
      "selected": false
    },
    {
      "experimento": "05_batchnorm",
      "balanced_accuracy": 0.6899393619461225,
      "accuracy": 0.690185546875,
      "precision": 0.9107968811946611,
      "recall": 0.4210397702975136,
      "f1": 0.5758689839572193,
      "roc_auc": 0.8633327810089131,
      "epocas_ejecutadas": 7,
      "mejor_epoca": 4,
      "segundos": 1167.87,
      "key": "05_batchnorm",
      "name": "BatchNorm",
      "tag": "Normalizar las activaciones",
      "description": "Añade normalización por lotes a la red profunda y reduce la tasa de aprendizaje a 0,0005. Cambia dos aspectos: no permite aislar el efecto de BatchNorm.",
      "architecture": "Red profunda + BatchNorm · Adam con tasa 0,0005",
      "maxEpochs": 15,
      "public": 0.65238,
      "selected": false
    }
  ],
  "history": [
    {
      "epoch": 1,
      "accuracy": 0.7310299873352051,
      "loss": 0.5542529225349426,
      "val_accuracy": 0.737823486328125,
      "val_loss": 0.531113862991333,
      "val_balanced_accuracy": 0.7377527188299661
    },
    {
      "epoch": 2,
      "accuracy": 0.761489987373352,
      "loss": 0.5106931328773499,
      "val_accuracy": 0.74871826171875,
      "val_loss": 0.5098243355751038,
      "val_balanced_accuracy": 0.7486889938079699
    },
    {
      "epoch": 3,
      "accuracy": 0.7637400031089783,
      "loss": 0.5041432976722717,
      "val_accuracy": 0.74365234375,
      "val_loss": 0.5153473019599915,
      "val_balanced_accuracy": 0.7435846265649086
    },
    {
      "epoch": 4,
      "accuracy": 0.7664999961853027,
      "loss": 0.5001031756401062,
      "val_accuracy": 0.741180419921875,
      "val_loss": 0.5182179808616638,
      "val_balanced_accuracy": 0.7411310570481712
    },
    {
      "epoch": 5,
      "accuracy": 0.7651699781417847,
      "loss": 0.5012421011924744,
      "val_accuracy": 0.742156982421875,
      "val_loss": 0.5191729068756104,
      "val_balanced_accuracy": 0.742091080063928
    }
  ],
  "steps": [
    {
      "title": "La imagen entra",
      "size": "32 × 32 × 3",
      "label": "Píxeles RGB",
      "text": "Cada fragmento tiene 32 píxeles de ancho, 32 de alto y tres canales de color. Dividimos los valores entre 255 para llevarlos al intervalo de 0 a 1.",
      "visual": "image",
      "note": "Este tamaño corresponde al recorte de la competición. Las imágenes originales de PCam son de 96 × 96."
    },
    {
      "title": "Buscamos patrones",
      "size": "32 × 32 × 16",
      "label": "Convolución + ReLU",
      "text": "Dieciséis filtros de 3 × 3 aprenden patrones locales. La función ReLU conserva las activaciones positivas. El relleno mantiene el ancho y el alto.",
      "visual": "conv",
      "note": "Los filtros se aprenden durante el entrenamiento. El esquema ilustra la operación; no muestra activaciones reales."
    },
    {
      "title": "Resumimos el espacio",
      "size": "16 × 16 × 16",
      "label": "MaxPooling 2 × 2",
      "text": "En cada zona de 2 × 2 conservamos el valor más alto. Reducimos el ancho y el alto para trabajar con una representación más pequeña.",
      "visual": "pool",
      "note": "El número de canales se mantiene. Solo se reduce el tamaño espacial."
    },
    {
      "title": "Combinamos patrones",
      "size": "8 × 8 × 32",
      "label": "Conv 32 + ReLU + Pool",
      "text": "Un segundo bloque aprende 32 mapas de características. Otra reducción de tamaño deja cada mapa en 8 × 8.",
      "visual": "deep",
      "note": "Este es el segundo bloque de la CNN base y de la variante con Dropout."
    },
    {
      "title": "Reunimos la información",
      "size": "32 valores",
      "label": "Promedio global + Dense 32",
      "text": "Calculamos el promedio de cada uno de los 32 mapas. Una capa de 32 neuronas combina esa información.",
      "visual": "dense",
      "note": "Dropout de 0,3 se aplica después de esta capa y antes de la salida, solo durante el entrenamiento de la variante elegida."
    },
    {
      "title": "Asignamos una clase",
      "size": "1 probabilidad",
      "label": "Sigmoid · umbral 0,5",
      "text": "La salida es una probabilidad estimada de clase 1. Si es al menos 0,5, asignamos clase 1; si es menor, clase 0.",
      "visual": "output",
      "note": "Esta explicación recorre la arquitectura. La web no ejecuta predicciones ni realiza diagnósticos."
    }
  ],
  "notes": [
    [
      "Presentación",
      "Somos el Grupo 1 de Machine Learning de la UPCH. Estudiamos si una red neuronal convolucional puede distinguir fragmentos con y sin tejido metastásico en el reto TNM112-Lab2. Vamos a explicar los datos, las cinco variantes y los resultados reales."
    ],
    [
      "El reto",
      "Cada ejemplo tiene una imagen y, en entrenamiento y validación, una etiqueta. Es aprendizaje supervisado porque el modelo aprende con respuestas conocidas. Clase 0 significa ausencia de tejido metastásico; clase 1 indica su presencia. La apariencia por sí sola no permite confirmar una clase a simple vista. Es una evaluación académica, sin validación clínica."
    ],
    [
      "Los datos",
      "Usamos los tres archivos HDF5 de la competición. Entrenamiento: 100 000 imágenes; validación: 32 768; prueba: 32 768. En train y valid hay claves x e y; en test solo x. Conservamos la separación oficial. Las clases están casi al 50 % en ambos conjuntos etiquetados. Los datos de prueba no intervienen en la elección del modelo."
    ],
    [
      "La CNN, paso a paso",
      "Recomiendo avanzar con los seis pasos. La convolución aprende patrones locales, MaxPooling reduce el tamaño y el promedio global resume cada mapa. La salida usa Sigmoid y un umbral de 0,5. La variante elegida añade Dropout de 0,3 antes de la salida. Dropout se usa al entrenar, no al predecir. El dibujo es un esquema, no una visualización de los filtros aprendidos."
    ],
    [
      "Los cinco experimentos",
      "Partimos de una CNN base y probamos Dropout, aumento de datos, más profundidad y BatchNorm. Usamos semilla 42, lotes de 256, Adam y entropía cruzada binaria. Paramos tras tres épocas sin mejorar la balanced accuracy de validación y restauramos la mejor época. La última variante cambia BatchNorm y la tasa de aprendizaje, así que no podemos atribuir el resultado solo a la normalización."
    ],
    [
      "Comparación",
      "Balanced accuracy es el promedio de la proporción de aciertos dentro de cada clase. Elegimos Dropout por su validación antes de consultar la clasificación pública. Su BA es 0,748689 frente a 0,748465 de la base: una diferencia de solo 0,0224 puntos porcentuales. La comparación usa una sola semilla; esa diferencia no prueba una mejora estable. Se pueden explorar también accuracy, precision, recall, F1 y AUC. La puntuación pública de Kaggle se compara aparte."
    ],
    [
      "El entrenamiento",
      "La mejor época de Dropout fue la segunda. El entrenamiento continuó hasta la quinta porque el criterio esperó tres épocas sin mejora en la BA de validación. Se restauraron los pesos de la segunda época. La curva de pérdida baja en entrenamiento mientras la validación deja de mejorar. Es una señal de que seguir entrenando no garantizaba mejorar."
    ],
    [
      "Los errores",
      "La matriz usa filas para la clase real y columnas para la predicha. De 16 369 fragmentos de clase 1, se detectaron 11 732 y se omitieron 4 637. De 16 399 de clase 0, se acertaron 12 802 y se marcaron 3 597 como clase 1. La sensibilidad es 71,67 % y la especificidad 78,07 %. El promedio da la BA de 74,87 %. Aquí se ve una limitación concreta del modelo."
    ],
    [
      "Kaggle",
      "Los cinco envíos quedaron en estado Complete el 15 de noviembre de 2026. Dropout obtuvo 0,73680 y la base 0,73509 en la clasificación pública. Ambos quedaron seleccionados para la evaluación final. Estos valores no son el resultado privado. El CSV definitivo tiene columnas id y Class, 32 768 filas e identificadores desde 0 hasta 32767 en el orden original de test."
    ],
    [
      "Lo que aprendimos",
      "La configuración más compleja no fue la mejor. Dropout superó por muy poco a la base en validación. Necesitamos repetir con más semillas antes de afirmar que esa ventaja se mantiene. Tampoco usamos test para elegir el modelo. Como trabajo futuro proponemos explorar más semillas y ajustes, manteniendo una evaluación separada."
    ],
    [
      "Entrega y fuentes",
      "El repositorio reúne el análisis ejecutado, el entrenamiento, la preparación de envíos, las métricas y el informe final. Los gráficos de esta web se construyen con los resultados guardados. Las imágenes provienen del notebook de análisis. Las fuentes son la competición, el conjunto PCam, el artículo de Veeling y colaboradores y la documentación de balanced accuracy."
    ]
  ],
  "matrix": [
    [
      12802,
      3597
    ],
    [
      4637,
      11732
    ]
  ],
  "split": [
    {
      "name": "Entrenamiento",
      "count": 100000,
      "zero": 49964,
      "one": 50036,
      "file": "train.h5",
      "role": "Aprender patrones"
    },
    {
      "name": "Validación",
      "count": 32768,
      "zero": 16399,
      "one": 16369,
      "file": "valid.h5",
      "role": "Comparar y elegir"
    },
    {
      "name": "Prueba",
      "count": 32768,
      "file": "test.h5",
      "role": "Generar el envío"
    }
  ],
  "sourceDate": "2026-11-15"
};
const metrics = {balanced_accuracy:"Balanced accuracy",accuracy:"Accuracy",precision:"Precision",recall:"Recall",f1:"F1",roc_auc:"ROC AUC"};
function score(model, metric, source) { return source === "public" ? model.public : model[metric]; }
function clampIndex(index, total) { return Math.min(total - 1, Math.max(0, index)); }
function resolveLocation(hash, ids) { const i=ids.indexOf(String(hash).replace(/^#/, "")); return i<0?0:i; }
function percent(value, digits=2) { return (value*100).toLocaleString("es-ES",{minimumFractionDigits:digits,maximumFractionDigits:digits})+" %"; }
function decimal(value, digits=6) { return value.toLocaleString("es-ES",{minimumFractionDigits:digits,maximumFractionDigits:digits}); }
function matrixStats(matrix) { const [[tn,fp],[fn,tp]]=matrix; return {sensitivity:tp/(tp+fn),specificity:tn/(tn+fp),balanced:(tp/(tp+fn)+tn/(tn+fp))/2,total:tn+fp+fn+tp}; }
root.PCam = Object.freeze({data,metrics,score,clampIndex,resolveLocation,percent,decimal,matrixStats});
})(globalThis);
