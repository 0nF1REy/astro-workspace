import { useState, useEffect } from "react";
import LoadingButton from "./LoadingButton";

const Likes = () => {
  const [likes, setLikes] = useState(0);
  const [pop, setPop] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleClick = () => {
    setLikes((prev) => prev + 1);
    setPop(true);
    setTimeout(() => setPop(false), 300);
  };

  return (
    <div className="likes">
      <div className="likes-container">
        <i
          className="fa-solid fa-heart"
          style={{ color: "var(--color-primary)" }}
          aria-hidden="true"
        ></i>{" "}
        {likes === 0 ? (
          <span className="likes-none">
            Seja o primeiro a curtir esta avaliação!
          </span>
        ) : (
          <span className="likes-text">
            <span className={pop ? "likes-pop" : undefined}>{likes}</span>
            {` pessoa${likes > 1 ? "s" : ""} ${likes > 1 ? "curtiram" : "curtiu"} esta avaliação.`}
          </span>
        )}
      </div>
      <LoadingButton
        className="like-btn"
        onClick={handleClick}
        loading={loading}
        loadingText="Carregando"
        spinnerColor="#fff"
        aria-label={loading ? "Carregando..." : "Curtir"}
      >
        <i
          className="fa-solid fa-thumbs-up like-icon"
          style={{ color: "#fff" }}
          aria-hidden="true"
        ></i>{" "}
        Curtir
      </LoadingButton>
      <style>{`
        .likes {
          background: var(--color-bg-card-alt);
          border: 1.5px solid var(--color-border);
          border-radius: 14px;
          box-shadow: 4px 4px 0 var(--color-border);
          color: var(--color-text-main);
          padding: 18px 16px 14px 16px;
          margin: 1.5rem 0;
          width: fit-content;
          max-width: 100%;
          min-width: 220px;
        }

        .likes-container {
          margin: 0 0 12px 0;
          font-size: 1.06em;
          color: var(--color-text-lead);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .likes-pop {
          display: inline-block;
          animation: pop 0.3s cubic-bezier(.42,1.52,.58,1) both;
          margin-right: 4px;
        }

        .likes-none {
          color: var(--color-text-muted);
          font-style: italic;
        }

        @keyframes pop {
          0% { transform: scale(1); }
          40% { transform: scale(1.25); }
          100% { transform: scale(1); }
        }

        .like-btn .like-icon {
          font-size: 1.1em;
          vertical-align: middle;
          line-height: 1;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default Likes;
