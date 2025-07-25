import React, { useEffect, useState } from "react";
import "../css/Social.css";
import { SocialService } from "../Services/SocialService";
import Popup from "../../../../Notification/js/Popup";
import { FaBell, FaComment, FaEdit, FaHeart, FaHome } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

const fakeAvatar = "https://res.cloudinary.com/dzvxim3zn/image/upload/v1753147038/ChatGPT_Image_07_56_52_22_thg_7_2025_n2qkuv.png";

function SocialPage() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ content: "", files: [] });
  const [popup, setPopup] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [menuOpenPostId, setMenuOpenPostId] = useState(null);
  const contacts = [
  { id: 1, name: "Lê Minh Hoàng", avatar: fakeAvatar },
  { id: 2, name: "Nguyễn Thị Mai", avatar: fakeAvatar },
  { id: 3, name: "Trần Văn B", avatar: fakeAvatar },
];
  const emojiList = [
    "😀", "😃", "😄", "😁", "😆", "😂", "🤣", "🥲", "😊", "😇", "🙂", "🙃", "😉", "😌",
    
    "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😜", "🤪", "😝", "🤑",

    "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😭", "😢", "😤", "😠", "😡",

    "🤔", "🤨", "😐", "😑", "😶", "😶‍🌫️", "😳", "🥵", "🥶", "😱", "😨", "😰",

    "👍", "👎", "👏", "🙌", "👐", "🤝", "🙏", "🤲", "💪", "👋", "🤘", "✌️", "🤟", "☝️", "✋", "🖐️",

    "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "❣️",

    "🎉", "🎊", "🎈", "🎁", "🎂", "🍰", "🧁", "🍕", "🍔", "🍟", "🍣", "🍜", "🥤",

    "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁",

    "☀️", "🌤️", "⛅", "🌧️", "⛈️", "❄️", "🌈", "🔥", "💧", "🌊", "🌪️"
  ];

  useEffect(() => {
    fetchData();
  }, []);
  const toggleLike = (postId) => {
      setLikes((prev) => {
        const liked = prev[postId]?.liked || false;
        const count = prev[postId]?.count || 0;
        return {
          ...prev,
          [postId]: {
            liked: !liked,
            count: liked ? count - 1 : count + 1,
          },
        };
      });
  };

  const openCommentModal = (post) => {
    setSelectedPost(post);
    if (!comments[post.id]) {
      setComments((prev) => ({
        ...prev,
        [post.id]: [
          { id: 1, user: "Mai", content: "Bài đăng hay quá!" ,avatar: "https://res.cloudinary.com/dzvxim3zn/image/upload/v1753147038/ChatGPT_Image_07_56_52_22_thg_7_2025_n2qkuv.png",date: "vừa xong"},
          { id: 2, user: "Hoàng", content: "Tuyệt vời luôn 😍",avatar: "https://res.cloudinary.com/dzvxim3zn/image/upload/v1753147038/ChatGPT_Image_07_56_52_22_thg_7_2025_n2qkuv.png",date: "vừa xong" },
        ],
      }));
    }
  };

  const addComment = () => {
    if (!commentInput.trim()) return;
    setComments((prev) => ({
      ...prev,
      [selectedPost.id]: [
        ...(prev[selectedPost.id] || []),
        { id: Date.now(), user: "Bạn", content: commentInput },
      ],
    }));
    setCommentInput("");
  };

  const handleEditPost = (post) => {
    setShowModal(true);
    setNewPost({ content: post.description, files: Array.isArray(post.images) ? post.images : [], projectId:post.projectId, userId : post.userId,createdAt : post.createdAt, code:post.code });
    setMenuOpenPostId(null);
  };

  const handleDeletePost = async (postId) => {
    try {
      const newItem = {
        status: "-1",
        projectId: postId,
      };

      await SocialService.update(newItem);
      setPopup({ type: "success", message: "Xoá bài viết thành công" });
      fetchData();
    } catch (error) {
      setPopup({ type: "error", message: "Xoá thất bại" });
    } finally {
      setMenuOpenPostId(null);
    }
  };


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

  const handleEdit = async () => {
    if (!newPost.content && newPost.files.length === 0) return;

    try {
      const base64Files = await Promise.all(
        newPost.files.map((file) => {
          if (typeof file === "string") return file;
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
          });
        })
      );

      const newItem = {
        description: newPost.content,
        images: base64Files,
        status: "20",
        projectId: newPost.projectId,
        userId   :newPost.userId,
        createdAt:newPost.createdAt,
        code    : newPost.code
      };

      await SocialService.update(newItem);
      setPopup({ type: "success", message: "Chỉnh sửa thành công" });
      setNewPost({ content: "", files: [], projectId: "", createdAt: null, code: null, userId : null });
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
    <div class="ctn-main">
      <div className="left-sidebar">
        <div className="sidebar-section">
          <ul className="menu-list">
            <li className="menu-item">
              <FaHome className="menu-icon" />
              <span className="menu-text">Trang chủ</span>
            </li>
            <li className="menu-item">
              <FaBell className="menu-icon" />
              <span className="menu-text">Thông báo</span>
            </li>
          </ul>
        </div>
    </div>
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
              <div className="emoji-section">
                <button className="emoji-toggle" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                  😊
                </button>
                {showEmojiPicker && (
                  <div className="emoji-list">
                    {emojiList.map((emoji, index) => (
                      <span
                        key={index}
                        className="emoji"
                        onClick={() => {
                          setNewPost((prev) => ({
                            ...prev,
                            content: prev.content + emoji,
                          }));
                        }}
                      >
                        {emoji}
                      </span>
                    ))}
                </div>
                )}
              </div>

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
                      {typeof file === "string" ? (
                          file.endsWith(".mp4") ? (
                            <video src={`/uploaded-media/${file}`} controls />
                          ) : (
                            <img src={`/uploaded-media/${file}`} alt="preview" />
                          )
                        ) : file?.type?.startsWith("image") ? (
                          <img src={URL.createObjectURL(file)} alt="preview" />
                        ) : file?.type?.startsWith("video") ? (
                          <video src={URL.createObjectURL(file)} controls />
                        ) : null}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mdl-act">
                {newPost.projectId != null ? (
                  <button onClick={handleEdit}>Sửa</button>
                ) : (
                  <button onClick={handlePost}>Đăng</button>
                )}

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
                <div className="post-menu-wrapper">
                  <span
                    className="post-menu-trigger"
                    onClick={() =>
                      setMenuOpenPostId(menuOpenPostId === post.projectId ? null : post.projectId)
                    }
                  >
                    ⋮
                  </span>

                  {menuOpenPostId === post.projectId && (
                    <div className="post-menu">
                      <button onClick={() => handleEditPost(post)}> <FaEdit style={{ color: 'green' }} /></button>
                      <button onClick={() => handleDeletePost(post.projectId)}><FaDeleteLeft style={{ color: 'red' }} /></button>
                    </div>
                  )}
                </div>
              </div>
              <div className="post-content" style={{ whiteSpace: "pre-line" }}>{post.description}</div>
              <div className="post-media">
                {post.images && post.images.map((media, i) => {
                  const isVideo = media.endsWith(".mp4") || media.includes("video");
                  return isVideo ? (
                    <video key={i} src={`/uploaded-media/${media}`} controls className="media-video" />
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
                <span
                  className="like"
                  style={{ color: likes[post.id]?.liked ? "hotpink" : "#333", cursor: "pointer" }}
                  onClick={() => toggleLike(post.id)}
                >
                  <FaHeart className="menu-icon" /> {post.inf02 + (likes[post.id]?.count || 0)}
                </span>
                <span
                  className="comment-btn"
                  style={{ marginLeft: "20px", cursor: "pointer", color: "#007bff" }}
                  onClick={() => openCommentModal(post)}
                >
                  <FaComment className="menu-icon" />
                </span>
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
      <div className="right-sidebar">
        <div className="sidebar-section">
          <h3 className="contact-title">Người liên hệ</h3>
          <ul className="contact-list">
            {contacts.map((contact) => (
              <li key={contact.id} className="contact-item">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="contact-avatar"
                />
                <span className="contact-name">{contact.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
      {selectedPost && (
        <div className="mdl-ovr">
          <div className="mdl-cmt">
            <h3 style={{ marginBottom: 10 }}>Bình luận bài đăng</h3>

            <div className="cmt-list">
              {(comments[selectedPost.id] || []).map((cmt) => (
                <div key={cmt.id} className="cmt-item animate-fade-in">
                  <img src={cmt.avatar} alt="avatar" className="cmt-avatar" />
                  <div className="cmt-content">
                    <div className="cmt-header">
                      <span className="cmt-user">{cmt.user}</span>
                      <span className="cmt-date">{cmt.date}</span>
                    </div>
                    <div className="cmt-text">{cmt.content}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cmt-input-section">
              <textarea
                className="cmt-input"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Viết bình luận..."
              />

              <div className="emoji-section">
                <button
                  className="emoji-toggle"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  😊
                </button>

                {showEmojiPicker && (
                  <div className="emoji-list">
                    {emojiList.map((emoji, index) => (
                      <span
                        key={index}
                        className="emoji"
                        onClick={() => setCommentInput((prev) => prev + emoji)}
                      >
                        {emoji}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mdl-act">
              <button onClick={addComment}>Gửi</button>
              <button onClick={() => setSelectedPost(null)}>Đóng</button>
            </div>
          </div>
        </div>
      )}


    </>
  );
}

export default SocialPage;