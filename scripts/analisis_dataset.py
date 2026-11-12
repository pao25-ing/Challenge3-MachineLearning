"""Exploración de los HDF5 de TNM112-Lab2 (2026), sin entrenar modelos."""
from pathlib import Path
import argparse
import csv

import h5py
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

ARCHIVOS = ("train.h5", "valid.h5", "test_x.h5")


def analizar(ruta_datos, ruta_salida):
    ruta_salida.mkdir(parents=True, exist_ok=True)
    conteos = {}
    ejemplos = {}
    resumen = []
    for nombre in ARCHIVOS:
        ruta = ruta_datos / nombre
        if not ruta.is_file():
            raise FileNotFoundError(f"No se encontró {ruta}. Descarga y extrae los tres archivos de Kaggle.")
        with h5py.File(ruta, "r") as f:
            print(f"\n{nombre}: claves {list(f.keys())}")
            x = f["x"]
            minimo, maximo, suma = 255, 0, 0
            for inicio in range(0, len(x), 2048):
                lote = x[inicio:inicio + 2048]
                minimo = min(minimo, int(lote.min()))
                maximo = max(maximo, int(lote.max()))
                suma += int(lote.sum(dtype=np.uint64))
            media = suma / np.prod(x.shape)
            print(f"  x: {x.shape}, {x.dtype}; píxeles: {minimo}–{maximo}; media: {media:.3f}")
            resumen.append([nombre, "x", str(x.shape), str(x.dtype), minimo, maximo, f"{media:.3f}"])
            if "y" in f:
                y = f["y"][:].reshape(-1)
                if len(y) != len(x):
                    raise ValueError(f"Diferente número de imágenes y etiquetas en {nombre}.")
                clases, cantidades = np.unique(y, return_counts=True)
                conteos[nombre] = dict(zip(clases.astype(int), cantidades.astype(int)))
                print(f"  y: {f['y'].shape}, {f['y'].dtype}; conteos: {conteos[nombre]}")
                resumen.append([nombre, "y", str(f["y"].shape), str(f["y"].dtype), "", "", ""])
                for clase in (0, 1):
                    indices = np.flatnonzero(y == clase)[:4]
                    ejemplos[(nombre, clase)] = [(int(i), x[int(i)]) for i in indices]
    with (ruta_salida / "resumen_archivos.csv").open("w", newline="", encoding="utf-8") as archivo:
        writer = csv.writer(archivo)
        writer.writerow(["archivo", "clave", "dimensiones", "tipo", "pixel_min", "pixel_max", "pixel_media"])
        writer.writerows(resumen)
    with (ruta_salida / "distribucion_clases.csv").open("w", newline="", encoding="utf-8") as archivo:
        writer = csv.writer(archivo)
        writer.writerow(["archivo", "clase", "cantidad", "porcentaje"])
        for nombre, clases in conteos.items():
            total = sum(clases.values())
            for clase, cantidad in sorted(clases.items()):
                writer.writerow([nombre, clase, cantidad, f"{100*cantidad/total:.5f}"])

    fig, axs = plt.subplots(1, 2, figsize=(10, 4.8), layout="constrained")
    for ax, nombre in zip(axs, ("train.h5", "valid.h5")):
        clases = conteos[nombre]
        valores = [clases.get(0, 0), clases.get(1, 0)]
        barras = ax.bar(["Clase 0", "Clase 1"], valores, color=["#79bfa9", "#9b65a0"], width=.58)
        ax.bar_label(barras, labels=[f"{v:,}\n({v/sum(valores):.2%})" for v in valores], padding=4)
        ax.set_title("Entrenamiento" if nombre == "train.h5" else "Validación", weight="bold")
        ax.set_ylabel("Número de imágenes")
        ax.set_ylim(0, max(valores) * 1.18)
        ax.spines[["top", "right"]].set_visible(False)
    fig.suptitle("Distribución de etiquetas en PCam", fontsize=15, weight="bold")
    fig.savefig(ruta_salida / "distribucion_clases.png", dpi=180, bbox_inches="tight")
    plt.close(fig)

    fig, axs = plt.subplots(4, 4, figsize=(8, 9), layout="constrained")
    for row, (nombre, clase) in enumerate((("train.h5", 0), ("train.h5", 1), ("valid.h5", 0), ("valid.h5", 1))):
        for col, (indice, imagen) in enumerate(ejemplos[(nombre, clase)]):
            ax = axs[row, col]; ax.imshow(imagen, interpolation="nearest")
            ax.set_title(f"{nombre} · clase {clase}\nÍndice {indice}", fontsize=8)
            ax.axis("off")
    fig.suptitle("Ejemplos de imágenes etiquetadas (32 × 32)", fontsize=14, weight="bold")
    fig.savefig(ruta_salida / "ejemplos_imagenes.png", dpi=180, bbox_inches="tight")
    plt.close(fig)
    print(f"\nResultados guardados en {ruta_salida}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--datos", type=Path, default=Path("data"), help="Carpeta que contiene los archivos .h5")
    parser.add_argument("--salida", type=Path, default=Path("results/eda"), help="Carpeta de resultados")
    args = parser.parse_args()
    analizar(args.datos, args.salida)
