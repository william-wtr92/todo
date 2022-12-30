import Link from "./Link"
import classNames from "classnames"
import Head from "next/head.js"
import Actions from "./Actions"
import { useRouter } from "next/router.js"
import { PlusIcon } from "@heroicons/react/24/solid"
import { useContext } from "../components/ContextProvider"

const NavLink = (props) => {
  const { asPath } = useRouter()

  return (
    <Link
      {...props}
      className={classNames("text-lg font-semibold", {
        underline: asPath === props.href,
      })}
    />
  )
}

const List = (props) => {
  const { title = "ToDo List", children } = props
  const { lists, updateListId, tasks, listId } = useContext();

  let calcul = 0;
  let avg = 0;

  return (
    <main className="flex flex-col">
      <Head>
        <title>{title}</title>
      </Head>
      <header className="flex pl-2 pt-2 justify-between items-center border-b">
        <nav>
          <ul className="flex">
            {lists.map((list) => 
              <div key={list.id} className="border-2 pl-4 pr-4 pt-1 text-center font-black rounded-lg border-b-0 border-l-0 relative space-between hover:cursor-pointer">
                <li onClick={() => updateListId(list.id)} className="mr-8">
                  {list.name}
                  
                </li>
                {tasks.map((task) => {
                    {task.listNameId === listId && task.valid ? calcul += 1 : null}
                    {task.listNameId === listId && task.valid ? (avg = calcul * 100 / tasks.length) : null}
                  
                }
              
                )}
              
                {list.id === listId ? (<div className={`bg-green-300  h-1 absolute left-0 bottom-0 transition-all ease-out duration-1000`} style={{ width: avg + "%" }}>
                </div>) : null}

                {list.id === listId ? (<div className=" bg-green-300 h-5 w-4 rounded-md absolute right-6 bottom-4">
                  {calcul}
                </div>) : null}

                {list.id === listId ? (<div className=" bg-blue-300 h-5 w-4 rounded-md absolute right-2 bottom-4">
                  {tasks.length}
                </div>) : null}
                  
              </div>

            )}

            <li className="ml-2 border-2 p-2 rounded-lg border-l-1 border-b-0">
              <NavLink href="/list/create"><PlusIcon className="w-6"/></NavLink>
            </li>

          </ul>
        </nav>
      </header>
      <section>
        <Actions />
        {children}
      </section>
    </main>
  )
}

export default List