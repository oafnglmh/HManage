import React, { useEffect, useState } from "react";
import "../css/Social.css";
import { SocialService } from "../Services/SocialService";
import Popup from "../../../../Notification/js/Popup";

const fakeAvatar = "https://res.cloudinary.com/dzvxim3zn/image/upload/v1753147038/ChatGPT_Image_07_56_52_22_thg_7_2025_n2qkuv.png";

function SocialPage() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ content: "", files: [] });
  const [popup, setPopup] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await SocialService.getAll();
      setPosts(data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách:", error);
    }
  };

  const closePopup = () => setPopup(null);

  const handlePost = async () => {
    if (!newPost.content && newPost.files.length === 0) return;

    try {
      const base64Files = await Promise.all(
        newPost.files.map(
          (file) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result);
              reader.onerror = reject;
            })
        )
      );

      const newItem = {
        description: newPost.content,
        images: base64Files,
        inf02: 0,
        status: "20",
      };

      await SocialService.add(newItem);
      setPopup({ type: "success", message: "Thêm bài thành công" });
      setNewPost({ content: "", files: [] });
      setShowModal(false);
      fetchData();
    } catch (error) {
      setPopup({ type: "error", message: "Thêm bài thất bại" });
    }
  };

  const openPreview = (src) => {
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(`
            <img src="/uploaded-media/${src}" style="width:40%; height:auto; display:block;" />
      `);
      win.document.close();
    } else {
      alert("Trình duyệt của bạn đã chặn cửa sổ popup. Vui lòng cho phép để xem ảnh.");
    }
  };


  return (
    <>
      <div className="ctn">
        <div className="pc-mini" onClick={() => setShowModal(true)}>
          <img src={fakeAvatar} alt="avatar" />
          <input placeholder="Bạn đang nghĩ gì?" readOnly />
          <div className="icn">
            <span role="img" aria-label="photo">🖼️</span>
            <span role="img" aria-label="video">🎥</span>
          </div>
        </div>

        {showModal && (
          <div className="mdl-ovr">
            <div className="mdl-cnt">
              <div className="mdl-usr">
                <img src={fakeAvatar} alt="avatar" />
                <span>Bạn</span>
              </div>
              <textarea
                placeholder="Bạn đang nghĩ gì?"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              />
              <div className="file-upload">
                <label htmlFor="fileInput">
                  <div className="file-placeholder">📷 Chọn ảnh hoặc video</div>
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={(e) =>
                    setNewPost({
                      ...newPost,
                      files: [...newPost.files, ...Array.from(e.target.files)],
                    })
                  }
                />
                <div className="preview-container">
                  {newPost.files.map((file, index) => (
                    <div key={index} className="preview-item">
                      <span
                        className="remove-btn"
                        onClick={() => {
                          const updatedFiles = [...newPost.files];
                          updatedFiles.splice(index, 1);
                          setNewPost({ ...newPost, files: updatedFiles });
                        }}
                      >
                        ❌
                      </span>
                      {file.type.startsWith("image") ? (
                        <img src={URL.createObjectURL(file)} alt="preview" />
                      ) : (
                        <video src={URL.createObjectURL(file)} controls />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mdl-act">
                <button onClick={handlePost}>Đăng</button>
                <button onClick={() => setShowModal(false)}>Huỷ</button>
              </div>
            </div>
          </div>
        )}

        <div className="post-list">
          {posts.map((post, idx) => (
            <div className="post-card animated" key={idx} style={{ animationDelay: `${idx * 0.05}s` }}>
              <div className="post-header">
                <img src={post.avatar || fakeAvatar} alt="avatar" className="post-avatar" />
                <div>
                  <div className="post-user">{post.userName || "Người dùng"}</div>
                  <div className="post-time">{new Date(post.createdAt).toLocaleString()}</div>
                </div>
              </div>
              <div className="post-content" style={{ whiteSpace: "pre-line" }}>{post.description}</div>
              <div className="post-media">
                {post.images && post.images.map((media, i) => {
                  const isVideo = media.endsWith(".mp4") || media.includes("video");
                  return isVideo ? (
                    <video key={i} src={media} controls className="media-video" />
                  ) : (
                   <img
                    key={i}
                    src={`/uploaded-media/${media}`}
                    alt={`media-${i}`}
                    className="media-image"
                    onClick={() => openPreview(media)}
                  />

                  );
                })}
              </div>
              <div className="post-footer">
                <span className="like">❤️ {post.inf02} lượt thích</span>
              </div>
            </div>
          ))}
        </div>

        {popup && (
          <Popup
            type={popup.type}
            message={popup.message}
            onClose={closePopup}
          />
        )}
      </div>
    </>
  );
}

export default SocialPage;