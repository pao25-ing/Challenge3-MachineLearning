# Resultados del proyecto

El [análisis exploratorio](eda/README.md) y el [entrenamiento de la CNN](cnn/README.md) están ejecutados con los archivos oficiales de la competición.

En `cnn/` se publican las métricas de cinco configuraciones, historiales, figuras, cinco candidatos CSV. El [notebook 02](../notebooks/02_entrenamiento_cnn.ipynb) conserva las ocho celdas ejecutadas y sus salidas reales.

**Mejor configuración con umbral 0,5:** `02_dropout`, con Balanced Accuracy de validación **0,748689**. La diferencia frente a la base es pequeña y procede de una sola ejecución por configuración.

Los CSV tienen 32 768 filas y columnas `ID,Class`. Sus ID consecutivos desde 1 son provisionales: la correspondencia completa con la competición todavía debe confirmarse. No se han realizado envíos ni obtenido puntuaciones de Kaggle.

La [guía de entrega](../docs/ENTREGA_KAGGLE.md) explica los pasos pendientes. Los archivos completos de los cinco modelos y las predicciones detalladas se conservan en los [outputs de la ejecución original](https://www.kaggle.com/code/cesarapcho/challenge-3-upch-grupo-1-cnn-pcam/output?scriptVersionId=370083154).
