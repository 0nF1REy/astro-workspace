import type { ImageMetadata } from "astro";
import styles from "./ImageGalleryReact.module.scss";

interface ImageGalleryReactProps {
  localImage: ImageMetadata;
  title?: string;
}

const ImageGalleryReact: React.FC<ImageGalleryReactProps> = ({
  localImage,
  title = "Gallery",
}) => {
  return (
    <div className={styles.imageGallery}>
      <h3 className={styles.imageGalleryTitle}>{title}</h3>
      <p className={styles.imageGalleryDescription}>
        Um componente React renderizando uma imagem otimizada pelo Astro.
      </p>

      <div className={styles.imageGalleryContainer}>
        <img
          src={localImage.src}
          alt="Imagem local otimizada renderizada em componente React"
          width={400}
          height={400}
          className={styles.imageGalleryImage}
        />
        <div className={styles.imageGalleryInfo}>
          <p>
            <strong>Width:</strong> 400px
          </p>
          <p>
            <strong>Height:</strong> 400px
          </p>
          <p>
            <strong>Tipo:</strong> Imagem local otimizada pelo Astro
          </p>
          <p className={styles.imageGalleryNote}>
            <em>
              A imagem foi otimizada pelo Astro em tempo de build e agora é
              renderizada em um componente React.
            </em>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryReact;
