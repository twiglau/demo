import { Button, Drawer } from "antd"
import { useDispatch, useSelector } from "store"
import { projectListActions, selectModalOpen } from "./project-list.slice"


export const ProjectModal = () => {
    const dispatch = useDispatch()
    const modalOpen = useSelector(selectModalOpen)
    return (
        <Drawer
        onClose={() => dispatch(projectListActions.closeModel())}
        open={modalOpen}
        width={'100%'}
        >
            <h1>Project Model</h1>
            <Button onClick={() => dispatch(projectListActions.closeModel())}>关闭</Button>
        </Drawer>
    )
}