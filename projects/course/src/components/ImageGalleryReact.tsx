import type { ImageMetadata } from "astro";

interface ImageGalleryReactProps {
  localImage: ImageMetadata;
  title?: string;
}

const ImageGalleryReact: React.FC<ImageGalleryReactProps> = ({
  localImage,
  title = "Gallery",
}) => {
  return (
    <div className="image-gallery">
      <h3 className="image-gallery__title">{title}</h3>
      <p className="image-gallery__description">
        Um componente React renderizando uma imagem otimizada pelo Astro.
      </p>

      <div className="image-gallery__container">
        <img
          src={localImage.src}
          alt="Imagem local otimizada renderizada em componente React"
          width={400}
          height={400}
          className="image-gallery__image"
        />
        <div className="image-gallery__info">
          <p>
            <strong>Width:</strong> 400px
          </p>
          <p>
            <strong>Height:</strong> 400px
          </p>
          <p>
            <strong>Tipo:</strong> Imagem local otimizada pelo Astro
          </p>
          <p className="image-gallery__note">
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
