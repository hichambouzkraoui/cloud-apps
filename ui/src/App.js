import React, { Fragment, useState, useEffect } from "react";

import { addNote as addNoteRequest, getNotes, validateForm } from "./utils";

import { addNoteFields, notes as noteCatalog } from "./constants";

import { useGetRequest } from "hooks/useGetRequest";

import Header from "components/Header";
import Form from "components/Form";
import Footer from "components/Footer";
import Note from "components/Note";
import Modal from "components/Modal";

import "./styles/global.scss";

const App = () => {

  // TODO - legacy, remove
  const id = "application";

  // TODO move to provider
  const [alert, setAlert] = useState({});

  const [showModal, setShowModal] = useState(false);

  const [notes, setNotes] = useState([]);

  const { data: fetchedNotes } = useGetRequest(getNotes);

  // TODO - remove after context refactor, should be unecessary
  useEffect(() => {
    setNotes(fetchedNotes);
  }, [fetchedNotes]);

  // TODO move to provider
  /** Submits the POST request to the API
   * @name addNote
   * @dev this requests tests basic validation between UI and API
   * @param {string} subject, contains note's subject value
   * @param {string} note, contains note's note value
   * @returns /addNote route response, or validation message
   * */

  const addNote = async (subject, note) => {
    const conditions = [
      {
        condition: subject.length < 5,
        error: addNoteFields[0].errors[0]
      },
      {
        condition: note.length < 25,
        error: addNoteFields[1].errors[0]
      }
    ];

    const errors = validateForm(conditions);

    if (errors.length > 0) {
      setAlert({
        title: "Note form error:",
        message: `Form contains the following error(s): ${errors.join(", ")}.`,
        status: "red"
      });
    }

    if (errors.length === 0) {
      const request = {
        // TODO - this should come from authentication token after phase 4
        user_id: 1,
        subject,
        note
      };

      const response = await addNoteRequest(request);

      if (!response.status) {
        return setAlert({
          title: "Note form error(s)",
          message: response,
          status: "red"
        });
      }
        const {
          data: { status }
        } = response;

        setAlert({
          title: "Note added!",
          message: status,
          status: "green"
        });

        const notes = await getNotes();

        // TODO - split into its child function for readability
        setTimeout(() => {
          setNotes(notes);
          setShowModal(false);
          return setAlert({});
        }, 500);
      }
  };

  /** Renders Notes based on API response
   * @name renderNotes
   * @dev manages connection issues use cases
   * @param {string} id, contains inherited id
   * @param {array} data, contains array of note objects
   * @returns  no note message || one or more <Note />
   * */

  const renderNotes = (id, data) => {
    // with data
    if (Array.isArray(data) && data.length > 0) {
      return data.map((object, index) => {
        return <Note key={id + index} id={`${id}-${index}`} data={object} />;
      });
    }

    // error
    if (!Array.isArray(data) && data.length > 0) {
      noteCatalog.apiError.note = data;
      return <Note id={`${id}-no-notes`} data={noteCatalog.apiError} />;
    }

    // initial
    return <Note id={`${id}-no-notes`} data={noteCatalog.noNotes} />;
  };
 //console.log("data", notes)
  return (
    <>
      <Header id={id} />
      <div className="divider" />
      <main id={id} className="application">
        <Modal
          state={showModal}
          // TODO - reset errors to default on close, first callback not working
          close={() => setAlert({}) + setShowModal(false)}
          data={{
            title: "Add note",
            content: (
              <Form
                id={id}
                message={alert}
                submit={addNote}
                fields={addNoteFields}
              />
            )
          }}
        />
        {notes && renderNotes(id, notes)}
      </main>
      <Footer
        id={id}
        open={() => setShowModal(true)}
        count={notes && notes.length}
        hasError={!Array.isArray(notes)}
      />
    </>
  );
};

export default App;
