"use client";

import { comingSoon } from "@/lib/fonts";
import { DynamicIcon } from "lucide-react/dynamic";
import Image from "next/image";
import { Option, Profile, Quiz, QuizLink } from "@prisma/client";
import { QuizWithPublicInfo } from "@/lib/types";
import QuizLinkComponent from "./quiz-link";
import { linkTypes } from "@/lib/constants";
import QuestionCard from "./question-card";
import {
  CheckIcon,
  GlobeIcon,
  GlobeLockIcon,
  MailIcon,
  PencilIcon,
  PenIcon,
  PhoneIcon,
  PlusIcon,
  SaveIcon,
  TableOfContentsIcon,
  TextCursorIcon,
  TrashIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";
import Button from "../button";
import { ChangeEvent, useRef, useState } from "react";
import Overlay from "../overlay";
import Modal from "../modal";
import TextInput from "../text-input";
import EditableOption from "./editable-option";
import { v4 } from "uuid";
import {
  addQuestion,
  markAnswered,
  updateQuestion,
  updateQuiz,
  deleteQuiz,
  updateQuizLinks,
} from "@/lib/actions";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import InputInfo from "../input-info";
import TextareaInput from "../textarea-input";
import Checkbox from "../checkbox";
import QuizExtendedLink from "./quiz-extended-link";

export default function QuizPageUI({
  quiz: quizDb,
}: {
  quiz: QuizWithPublicInfo;
}) {
  const [quiz, setQuiz] = useState(quizDb);
  const [showAddQuestionUI, setShowAddQuestionUI] = useState(false);
  const [questionName, setQuestionName] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const editingQuestion = useRef("");
  const [editingCorrectAnswer, setEditingCorrectAnswer] = useState("");
  const [correctAnswerExplanation, setCorrectAnswerExplanation] = useState("");
  const [isEditingExistingQuestion, setIsEditingExistingQuestion] =
    useState(false);
  const [quizName, setQuizName] = useState(quiz.title);
  const [showInfoUI, setShowInfoUI] = useState(false);
  const [quizDescription, setQuizDescription] = useState(
    quiz.description ?? "",
  );
  const [showConfirmPublishModal, setShowConfirmPublishModal] = useState(false);
  const [showDeleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [showQuizContactModal, setShowQuizContactModal] = useState(false);
  const [quizLinks, setQuizLinks] = useState<QuizLink[]>([]);
  const [quizLinkStatus, setQuizLinkStatus] = useState("unset");

  const currentUser = useUser();

  function handleOptionTextChanged(id: string, newName: string) {
    const nextOptions = options.map((option) => {
      if (option.id === id) {
        return {
          ...option,
          name: newName,
        };
      } else {
        return option;
      }
    });
    setOptions(nextOptions);
  }
  function handleAddOption() {
    setOptions([
      ...options,
      {
        id: v4(),
        name: "An option?",
        questionId: editingQuestion.current,
        icon: 0,
      },
    ]);
  }
  function handleAddQuestion() {
    setIsEditingExistingQuestion(false);
    setShowAddQuestionUI(true);
    editingQuestion.current = v4();
  }
  function handleDeleteQuestion(id: string) {
    console.log("test");
    console.log(options);
    console.log(id);
    setOptions(options.filter((option) => option.id !== id));
  }

  async function handleFinishQuestion() {
    if (isEditingExistingQuestion) {
      const question = await updateQuestion(
        editingQuestion.current,
        questionName,
        options,
        editingCorrectAnswer,
        correctAnswerExplanation,
        quiz.id,
      );
      if (!question) {
        console.error("whoops");
        return;
      }
      const nextQuestions = quiz.questions.map((q) => {
        if (q.id === editingQuestion.current) {
          return question;
        } else {
          return q;
        }
      });
      setQuiz({
        ...quiz,
        questions: nextQuestions,
      });
      handleCloseQuestionModal();
      return;
    }
    const question = await addQuestion(
      editingQuestion.current,
      questionName,
      options,
      editingCorrectAnswer,
      correctAnswerExplanation,
      quiz.id,
    );
    if (!question) {
      console.error("whoops");
      return;
    }
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, question],
    });
    handleCloseQuestionModal();
  }
  function handleToggleCorrectAnswer(id: string) {
    setEditingCorrectAnswer(id);
  }
  function handleCloseQuestionModal() {
    setQuestionName("");
    setCorrectAnswerExplanation("");
    setOptions([]);
    setShowAddQuestionUI(false);
    setEditingCorrectAnswer("");
    editingQuestion.current = "";
  }
  function handleChangeIcon(id: string, newIcon: number) {
    const nextOptions = options.map((option) => {
      if (option.id === id) {
        return {
          ...option,
          icon: newIcon,
        };
      } else {
        return option;
      }
    });
    setOptions(nextOptions);
  }
  function handleEditQuestion(index: number) {
    setQuestionName(quiz.questions[index].questionName);
    editingQuestion.current = quiz.questions[index].id;
    setOptions(quiz.questions[index].options);
    setEditingCorrectAnswer(quiz.questions[index].correctAnswer);
    setCorrectAnswerExplanation(quiz.questions[index].correctAnswerExplanation);
    setIsEditingExistingQuestion(true);
    setShowAddQuestionUI(true);
  }
  async function handleAnswer(answer: string) {
    await markAnswered(answer);
  }
  function handleOpenInfoModal() {
    setQuizName(quiz.title);
    setQuizDescription(quiz.description ?? "");
    setShowInfoUI(true);
  }
  async function handleFinishEditingQuiz() {
    await updateQuiz(
      quiz.id,
      quizName,
      quizDescription,
      quiz.isPublic,
      quiz.lockAnswersAutomatically,
    );
    setQuiz({
      ...quiz,
      title: quizName,
      description: quizDescription,
    });
    setShowInfoUI(false);
  }
  async function setPublishStatus(newStatus: boolean) {
    await updateQuiz(
      quiz.id,
      quiz.title,
      quiz.description ?? "",
      newStatus,
      quiz.lockAnswersAutomatically,
    );
    setQuiz({
      ...quiz,
      isPublic: newStatus,
    });
    setShowConfirmPublishModal(false);
  }
  async function toggleLockedFromAnswering() {
    await updateQuiz(
      quiz.id,
      quiz.title,
      quiz.description ?? "",
      quiz.isPublic,
      !quiz.lockAnswersAutomatically,
    );
    setQuiz({
      ...quiz,
      lockAnswersAutomatically: !quiz.lockAnswersAutomatically,
    });
  }
  function handleOpenEditLinksModal() {
    setQuizLinks(quiz.links);
    setShowQuizContactModal(true);
  }
  function handleChangeQuizLinkBtn(newStatus: string) {
    if (newStatus === "Create a link") {
      return;
    }
    const index = linkTypes.findIndex(
      (type) => type.friendlyName === newStatus,
    );

    setQuizLinks([
      ...quizLinks,
      {
        id: v4(),
        name: linkTypes[index].icon,
        type: index,
        description: "",
        quizId: quiz.id,
      },
    ]);
  }
  function handleChangeQuizLinkText(id: string, newText: string) {
    const nextQuizLinks = quizLinks.map((link) => {
      if (link.id === id) {
        return {
          ...link,
          description: newText,
        };
      } else {
        return link;
      }
    });
    setQuizLinks(nextQuizLinks);
  }
  async function handleSaveQuizLinks() {
    await updateQuizLinks(quiz.id, quizLinks);
    setQuiz({
      ...quiz,
      links: quizLinks,
    });
    setQuizLinks([]);
    setShowQuizContactModal(false);
  }
  return (
    <div
      className={`w-full h-full bg-pink-50 text-black ${comingSoon.className}`}
    >
      <div className="flex flex-row gap-2 w-full pl-12 pr-12 pt-16 pb-16 rounded-sm bg-pink-100 items-center">
        <div className="flex flex-1 flex-row gap-4 items-center">
          <Image
            src={
              quiz.owner.profilePicture ??
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                quiz.owner.username,
              )}`
            }
            alt={`${quiz.owner.username}'s profile picture`}
            width={64}
            height={64}
            className="rounded-sm object-cover w-16 h-16 border-pink-200 border-2"
          />
          <div className="flex flex-col gap-2 text-black">
            <h2 className="text-4xl">{quiz.title}</h2>
            <p>
              by{" "}
              <Link href={`/profile/${quiz.owner.username}`}>
                @{quiz.owner.username}
                {quiz.description && "- "}
              </Link>
              {quiz.description}
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center">
          {quiz.links &&
            quiz.links.map((link) => (
              <QuizLinkComponent href={link.description}>
                <DynamicIcon
                  name={linkTypes[link.type].icon}
                  color="black"
                  size={20}
                />
              </QuizLinkComponent>
            ))}
        </div>
      </div>
      {currentUser.user?.id === quiz.owner.id && (
        <div className="pt-4 pb-4 pl-12 pr-12 flex flex-row items-center gap-2 bg-orange-200">
          <Button onClick={handleAddQuestion}>
            <PlusIcon width={16} height={16} />
            Add question
          </Button>
          <Button onClick={handleOpenInfoModal}>
            <PenIcon width={16} height={16} />
            Change info
          </Button>
        </div>
      )}
      <div className="p-8 flex flex-col gap-6">
        {quiz.questions.map((question, i) => (
          <QuestionCard
            number={quiz.questions.findIndex((q) => q.id === question.id) + 1}
            questionName={question.questionName}
            options={question.options} //golly we need to find a better way to do this
            correctAnswer={question.correctAnswer}
            correctExplanation={question.correctAnswerExplanation}
            onEdit={() => handleEditQuestion(i)}
            canEdit={currentUser.user?.id === quiz.owner.id}
            handleAnswer={(answer) => handleAnswer(answer)}
            lockedFromAnsweringDb={quiz.lockAnswersAutomatically}
            answered={question.answered}
          />
        ))}
      </div>
      <div className="w-full bg-pink-100 p-8 flex flex-col gap-2">
        <div className="w-full flex flex-row gap-2">
          <div className="flex-1 flex flex-col gap-1">
            <h2 className="text-2xl">
              This is the end of {quiz.owner.username}'s BioQuiz
            </h2>
          </div>
          <Button onClick={handleOpenEditLinksModal}>
            <PencilIcon width={16} height={16} />
            Edit links
          </Button>
        </div>
        <div className="flex flex-row gap-2">
          {quiz.links.map((link) => (
            <QuizExtendedLink
              icon={
                <DynamicIcon
                  name={linkTypes[link.type].icon}
                  color="black"
                  size={20}
                />
              }
              friendlyName={linkTypes[link.type].friendlyName}
              description={link.description}
            />
          ))}
        </div>
        <p>Create your own BioQuiz</p>
      </div>
      {showAddQuestionUI && (
        <Overlay>
          <Modal
            header={
              <div className="flex flex-row gap-2 items-center">
                <div className="flex flex-col gap-2 flex-1">
                  {isEditingExistingQuestion ? (
                    <>
                      <h2 className="text-2xl font-bold">Editing question</h2>
                      <p>want to change things up?</p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold">Add a question</h2>
                      <p>what do you want to ask?</p>
                    </>
                  )}
                </div>
                <Button onClick={handleCloseQuestionModal}>
                  <XIcon width={16} height={16} />
                </Button>
              </div>
            }
          >
            <TextInput
              icon={<TextCursorIcon width={16} height={16} />}
              onChange={(e) => setQuestionName(e.target.value)}
              value={questionName}
              label="Question name"
            />
            <div className="flex flex-row gap-2 items-center">
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="text-xl font-bold">Options</h3>
                <p>Pick a minumum of 2 options, max 5 options.</p>
              </div>
              {options.length < 2 && (
                <div className="p-1 rounded-xl bg-orange-200 shrink">
                  {options.length}/2
                </div>
              )}
              {options.length >= 2 && options.length <= 5 && (
                <div className="p-1 rounded-xl bg-green-200 shrink">
                  {options.length}/5
                </div>
              )}
              {options.length > 5 && (
                <div className="p-1 rounded-xl bg-red-200 shrink">
                  {options.length}/5
                </div>
              )}

              <div className="flex flex-row gap-2">
                <Button onClick={handleAddOption}>
                  <PlusIcon width={16} height={16} />
                  Add
                </Button>
              </div>
            </div>
            {options.map((option) => (
              <EditableOption
                onChangeOptionText={(e) =>
                  handleOptionTextChanged(option.id, e.target.value)
                }
                optionText={option.name}
                onDelete={() => handleDeleteQuestion(option.id)}
                isCorrectAnswer={editingCorrectAnswer !== option.id}
                onToggleCorrectAnswer={() =>
                  handleToggleCorrectAnswer(option.id)
                }
                onChangeIcon={(e) =>
                  handleChangeIcon(option.id, Number(e.target.value))
                }
              />
            ))}
            <TextInput
              icon={<CheckIcon width={16} height={16} />}
              onChange={(e) => setCorrectAnswerExplanation(e.target.value)}
              value={correctAnswerExplanation}
              label="Correct answer explanation"
            />
            {questionName.length > 0 &&
              options.length >= 2 &&
              options.length <= 5 &&
              editingCorrectAnswer.length > 0 && (
                <Button onClick={handleFinishQuestion}>
                  <CheckIcon width={16} height={16} />
                  Finish
                </Button>
              )}
          </Modal>
        </Overlay>
      )}
      {showInfoUI && (
        <Overlay>
          <Modal
            header={
              <h2 className="text-2xl font-bold">
                Changing settings for {quiz.title}
              </h2>
            }
          >
            <TextInput
              icon={<TextCursorIcon width={16} height={16} />}
              onChange={(e) => setQuizName(e.target.value)}
              value={quizName}
              label="Quiz name"
            />
            <TextareaInput
              icon={<TableOfContentsIcon width={16} height={16} />}
              onChange={(e) => setQuizDescription(e.target.value)}
              value={quizDescription}
              label="Quiz description"
            />
            <div className="flex flex-row gap-2">
              <Checkbox
                checked={quiz.lockAnswersAutomatically}
                onChange={() => toggleLockedFromAnswering()}
              />
              <p>
                When users answer a question, prevent the answer from being
                changed
              </p>
            </div>

            <InputInfo
              label="Danger zone"
              icon={<TriangleAlertIcon width={16} height={16} />}
            />
            {quiz.isPublic ? (
              <Button onClick={() => setShowConfirmPublishModal(true)}>
                <GlobeLockIcon width={16} height={16} />
                Unpublish
              </Button>
            ) : (
              <Button onClick={() => setShowConfirmPublishModal(true)}>
                <GlobeIcon width={16} height={16} />
                Publish
              </Button>
            )}

            <Button onClick={() => setDeleteConfirmModal(true)}>
              <TrashIcon width={16} height={16} />
              Delete
            </Button>
            <div className="w-3/4 ml-auto mr-auto mt-2 mb-2 h-0.5 bg-pink-300"></div>
            <Button onClick={handleFinishEditingQuiz}>
              <CheckIcon width={16} height={16} />
              Finish
            </Button>
          </Modal>
        </Overlay>
      )}
      {showConfirmPublishModal && (
        <Overlay>
          <Modal
            header={<h2 className="text-2xl font-bold">Confirm visibility</h2>}
          >
            <p>
              Warning: You're about to make your quiz{" "}
              {quiz.isPublic ? <b>private</b> : <b>public</b>}.
            </p>
            <p>Are you really sure you want to do this?</p>
            <Button onClick={() => setPublishStatus(!quiz.isPublic)}>
              <CheckIcon width={16} height={16} />
              YESSSSSS
            </Button>
            <Button onClick={() => setShowConfirmPublishModal(false)}>
              <XIcon width={16} height={16} />
              NAURRRRR
            </Button>
          </Modal>
        </Overlay>
      )}
      {showDeleteConfirmModal && (
        <Overlay>
          <Modal
            header={<h2 className="text-2xl font-bold">Confirm deletion</h2>}
          >
            <p>
              Warning: You're about to <b>delete your quiz</b>
            </p>
            <p>
              This is a <b>destructive</b> action! You won't be able to get your
              quiz back. All your questions, answers, and analytics will
              disappear.
            </p>
            <p>Are you really sure you want to do this?</p>
            <Button onClick={() => deleteQuiz(quiz.id)}>
              <CheckIcon width={16} height={16} />
              yes :')
            </Button>
            <Button onClick={() => setDeleteConfirmModal(false)}>
              <XIcon width={16} height={16} />
              NO NO NO NO NO
            </Button>
          </Modal>
        </Overlay>
      )}
      {showQuizContactModal && (
        <Overlay>
          <Modal
            header={<h2 className="text-2xl font-bold">Editing quiz links</h2>}
          >
            <p>
              Quiz links allow you to direct your players to where to contact
              you.
            </p>
            <p>Add a quiz link below by clicking Create New Link.</p>
            {quizLinks.map((quizLink) => (
              <TextInput
                icon={
                  <DynamicIcon
                    name={linkTypes[quizLink.type].icon}
                    color="black"
                    size={20}
                  />
                }
                label={linkTypes[quizLink.type].friendlyName}
                onChange={(e) =>
                  handleChangeQuizLinkText(quizLink.id, e.target.value)
                }
                value={quizLink.description}
              />
            ))}

            <select
              className="flex flex-row gap-2 items-center bg-pink-200 border-pink-300 border-2 p-3 justify-center text-center font-bold hover:bg-pink-300"
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleChangeQuizLinkBtn(e.target.value)
              }
              value={quizLinkStatus}
            >
              <option value="unset">Create new link</option>
              {linkTypes.map((type) => (
                <option value={type.friendlyName}>{type.friendlyName}</option>
              ))}
            </select>
            <Button onClick={handleSaveQuizLinks}>
              <SaveIcon width={16} height={16} />
              Save and finish
            </Button>
          </Modal>
        </Overlay>
      )}
    </div>
  );
}
