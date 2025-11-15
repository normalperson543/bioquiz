"use client";

import { comingSoon } from "@/lib/fonts";
import { DynamicIcon } from "lucide-react/dynamic";
import Image from "next/image";
import { Option, Profile, Quiz } from "@prisma/client";
import { QuizWithPublicInfo } from "@/lib/types";
import QuizLink from "./quiz-link";
import { linkTypes } from "@/lib/constants";
import QuestionCard from "./question-card";
import {
  CheckIcon,
  GlobeLockIcon,
  MailIcon,
  PenIcon,
  PhoneIcon,
  PlusIcon,
  TextCursorIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import Button from "../button";
import { useRef, useState } from "react";
import Overlay from "../overlay";
import Modal from "../modal";
import Input from "../input";
import EditableOption from "./editable-option";
import { v4 } from "uuid";
import { addQuestion, updateQuestion } from "@/lib/actions";
import Link from "next/link";
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
        quiz.id
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
      quiz.id
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
                quiz.owner.username
              )}`
            }
            alt={`${quiz.owner.username}'s profile picture`}
            width={60}
            height={60}
            className="rounded-sm"
          />
          <div className="flex flex-col gap-2 text-black">
            <h2 className="text-4xl">{quiz.title}</h2>
            <p>
              by{" "}
              <Link href={`/profile/${quiz.owner.username}`}>
                @{quiz.owner.username} -{" "}
              </Link>
              {quiz.description}
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center">
          {quiz.links &&
            quiz.links.map((link) => (
              <QuizLink href={link.description}>
                <DynamicIcon
                  name={linkTypes[link.type].icon}
                  color="black"
                  size={20}
                />
              </QuizLink>
            ))}
        </div>
      </div>
      <div className="pt-4 pb-4 pl-12 pr-12 flex flex-row items-center gap-2 bg-orange-200">
        <Button onClick={handleAddQuestion}>
          <PlusIcon width={16} height={16} />
          Add question
        </Button>
        <Button>
          <PenIcon width={16} height={16} />
          Change info
        </Button>
        <Button>
          <GlobeLockIcon width={16} height={16} />
          Unpublish
        </Button>
        <Button>
          <TrashIcon width={16} height={16} />
          Delete
        </Button>
      </div>
      <div className="p-8 flex flex-col gap-6">
        {quiz.questions.map((question, i) => (
          <QuestionCard
            number={quiz.questions.findIndex((q) => q.id === question.id) + 1}
            questionName={question.questionName}
            options={question.options} //golly we need to find a better way to do this
            correctAnswer={question.correctAnswer}
            correctExplanation={question.correctAnswerExplanation}
            onEdit={() => handleEditQuestion(i)}
          />
        ))}
      </div>
      <div className="w-full bg-pink-100 p-8 flex flex-col gap-2">
        <h2 className="text-2xl">
          This is the end of {quiz.owner.username}'s BioQuiz
        </h2>
        <div className="flex flex-row gap-2">
          <div className="rounded-2xl flex flex-row gap-2 bg-pink-200 self-start w-fit">
            <div className="rounded-full p-2 bg-pink-300">
              <MailIcon width={16} height={16} />
            </div>
            <div className="flex flex-row gap-2 items-center mr-2">
              <b>Email</b> <p>(admin@example.com)</p>
            </div>
          </div>
          <div className="rounded-2xl flex flex-row gap-2 bg-pink-200 self-start w-fit">
            <div className="rounded-full p-2 bg-pink-300">
              <PhoneIcon width={16} height={16} />
            </div>
            <div className="flex flex-row gap-2 items-center mr-2">
              <b>Phone</b> <p>(888-555-1234)</p>
            </div>
          </div>
        </div>
        <p>Create your own BioQuiz</p>
      </div>
      {showAddQuestionUI && (
        <Overlay>
          <Modal
            header={
              <div className="flex flex-row gap-2 items-center">
                <div className="flex flex-col gap-2 flex-1">
                  {editingQuestion ? (
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
            <Input
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
                <div className="p-1 rounded-xl bg-orange-200 flex-shrink">
                  {options.length}/2
                </div>
              )}
              {options.length >= 2 && options.length <= 5 && (
                <div className="p-1 rounded-xl bg-green-200 flex-shrink">
                  {options.length}/5
                </div>
              )}
              {options.length > 5 && (
                <div className="p-1 rounded-xl bg-red-200 flex-shrink">
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
            <Input
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
    </div>
  );
}
