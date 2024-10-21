export default function Messages({}) {
  return (
    <div className="chat-container mt-3">
      <div className="card card-chat rounded-start-lg-0 border-start-lg-0">
        <div className="card-body h-100">
          <div className="chat-conversation-content custom-scrollbar">
            <div className="text-center small my-2">No messages yet</div>

            <div className="d-flex mb-1">
              <div className=" avatar avatar-xs me-2">
                <img src="" alt="" className="avatar-img rounded-circle" />
              </div>
              <div className="flex-grow-1">
                <div className="w-100">
                  <div className="d-flex flex-column">
                    <h6 className="mt-1">sendername</h6>
                    <div className=""></div>
                    <div className="small my-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form className="chat-input-form">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Message"
              />
              <button className="btn btn-md" type="submit">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

{
  /*



export default function Messages({
 
}) {
  
  return (
    <div className="chat-container mt-3">
      <div className="card card-chat rounded-start-lg-0 border-start-lg-0">
        <div className="card-body h-100">
          <div className="chat-conversation-content custom-scrollbar">
          
              <div className="text-center small my-2">No messages yet</div>
            
             
                <div
                 
                  className="d-flex mb-1"
                >
                  <div
                    className=" avatar avatar-xs me-2"
                  >
                    <img
                      src=""
                      alt=""
                      className="avatar-img rounded-circle"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <div className="w-100">
                      <div className="d-flex flex-column">
                        <h6 className="mt-1">sendername</h6>
                        <div
                          className={`bg-${
                           
                              ? 'light text-grey'
                              : 'light text-secondary'
                          } p-2 px-3 rounded-2`}
                        >
                         
                        </div>
                        <div className="small my-2">
                        
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <form className="chat-input-form">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Message"
               
              />
              <button className="btn btn-md" type="submit">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
*/
}
