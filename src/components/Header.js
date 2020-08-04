import React from 'react'
import Button from '@material-ui/core/Button';

const Header = (props) => {

  const { handleChangeScreen } = props;
    return (
      <header>
        <section className="wrp">
          <div className="title">
            <h1 onClick={(e)=> handleChangeScreen("displayTables")} >Bob-table CMS</h1>
            <p>Create your tables with style</p>
          </div>
          <div className="actions">
            <ul className="hyperlinks">
              <li>
                <a
                  className="btn-txt btn-gray btn-txt-white icon-close-thin btn-icon-left"
                  href={"#javascript"}
                  onClick={(e)=> handleChangeScreen("upload")}
                >
                  UPLOAD TABLE 
                </a>
              </li>
              <li>
                <a
                  className="btn-txt btn-gray btn-txt-white icon-close-thin btn-icon-left"
                  href={"#javascript"}
                  onClick={(e)=> handleChangeScreen("crudTable")}
                >
                  CRUD table
                </a>
              </li>
              <li>
                <a
                  className="btn-fill btn-white btn-txt-black"
                  href="#javascript"
                  type="button"
                >
                  Save table
                </a>
              </li>
              <li>
                <a
                  className="btn-fill btn-white btn-txt-black"
                  href="#javascript"
                  type="button"
                >
                  login
                </a>
              </li>
              <li>
                <a
                  className="btn-fill btn-white btn-txt-black"
                  href="#javascript"
                  type="button"
                >
                  logout
                </a>
              </li>
            </ul>
            <Button variant="contained" color="primary">
                        login
            </Button>
            <Button variant="contained" color="secondary">
            logout
            </Button>
          </div>
        </section>
      </header>
    );
}

export default Header;