import { useAppSelector } from "../redux/hooks"
import { modalSelectors, ModalTypes } from "../redux/modal/slice"

const useIsModalOpen = (type: ModalTypes) => {
    const isPortalOpen = useAppSelector(modalSelectors.selectIsPortalOpen)
    const chosenModal = useAppSelector(modalSelectors.selectChosenModal)

    const result = isPortalOpen && chosenModal === type
    console.log({ isPortalOpen, chosenModal, type, result })

    return result
}

export default useIsModalOpen