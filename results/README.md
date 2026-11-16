# Resultados del proyecto

## Resultados disponibles

En [eda/](eda/README.md) se publican las tablas y figuras del análisis exploratorio ejecutado con los datos de la competición. El notebook 01 contiene las salidas guardadas.

## Resultados de entrenamiento

El [notebook 02](../notebooks/02_entrenamiento_cnn.ipynb) está preparado, pendiente de ejecución con los HDF5 oficiales. No hay métricas de CNN ni predicciones reales publicadas en esta versión del repositorio.

Al terminar, el notebook guarda en `results/cnn`:

- `metricas_validacion.csv`: comparación de las cinco configuraciones.
- `curvas_aprendizaje.png` y `matriz_confusion.png`.
- Un modelo `mejor_modelo.keras`, historial y predicciones de validación por experimento.
- Cinco candidatos CSV con columnas `ID,Class`.
- `configuracion.json`, firmas SHA-256 y `estado_ejecucion.json` para documentar la ejecución.
- `RESUMEN_RESULTADOS.md` con los valores calculados durante la ejecución.

Los candidatos usan provisionalmente ID consecutivos desde 1. Solo se genera `submission.csv` cuando se confirma la correspondencia de los ID en la configuración del notebook.

Los modelos se conservan en los outputs de Kaggle o en Google Drive por su tamaño. Al publicar los resultados en GitHub se incluyen las métricas, figuras, resumen y notebook ejecutado. Las puntuaciones de Kaggle y las evidencias de los envíos se registran por separado, siguiendo la [guía](../docs/ENTREGA_KAGGLE.md).

