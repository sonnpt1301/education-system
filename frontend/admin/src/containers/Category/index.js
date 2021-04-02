import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { createCategoryAction, deleteCategoryAction, getListCategoryAction, updateCategoryAction } from '../../actions/category.action'
import Input from '../../components/common/Input'
import Loader from '../../components/common/Loader'
import Message from '../../components/common/Message'
import Modal from '../../components/common/Modal'
import Layout from '../../components/Layout'

const Category = () => {
    const dispatch = useDispatch()

    const {
        categoryList,
        loading,
        loadingCreate,
        errorCreate,
        loadingUpdate,
        errorUpdate,
        loadingDelete,
        errorDelete
    } = useSelector(state => state.category)

    const [name, setName] = useState('')
    const [categoryId, setCategoryId] = useState('')

    const [createMessage, setCreateMessage] = useState('')

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const handleCloseCreateModal = () => setShowCreateModal(false)
    const handleShowCreateModal = () => setShowCreateModal(true)

    const handleCloseUpdateModal = () => setShowUpdateModal(false)

    const handleCloseDeleteModal = () => setShowDeleteModal(false)


    const resetField = () => {
        setName('')
        setCreateMessage('')
        setCategoryId('')
        setShowCreateModal(false)
        setShowUpdateModal(false)
        setShowDeleteModal(false)
    }


    const handleShowUpdateModal = (e, id) => {
        const category = categoryList.find(c => c._id === id)
        setCategoryId(category._id)
        setName(category.name)
        setShowUpdateModal(true)
    }

    const handleShowDeleteModal = (e, id) => {
        const category = categoryList.find(c => c._id === id)
        console.log(category)
        setCategoryId(category._id)
        setShowDeleteModal(true)
    }

    const createCategoryHandler = (e) => {
        e.preventDefault()
        dispatch(createCategoryAction({ name }))
    }

    const updateCategoryHandler = () => {
        dispatch(updateCategoryAction({
            id: categoryId,
            body: { name }
        }))
    }

    const deleteCategoryHandler = () => {
        dispatch(deleteCategoryAction(categoryId))
    }

    useEffect(() => {
        if (!loadingCreate && !errorCreate) {
            setCreateMessage('Create new category successful');
            setTimeout(() => {
                resetField();
            }, 1000);
        }

    }, [loadingCreate, errorCreate,]);

    useEffect(() => {
        if (!loadingUpdate && !errorUpdate) {
            setCreateMessage('Update category successful');
            setTimeout(() => {
                resetField();
            }, 1000);
        }
    }, [loadingUpdate, errorUpdate])

    useEffect(() => {
        if (!loadingDelete && !errorDelete) {
            setCreateMessage('Delete category successful');
            setTimeout(() => {
                resetField();
            }, 1000);
        }
    }, [loadingDelete, errorDelete,]);

    useEffect(() => {
        dispatch(getListCategoryAction())
    }, [loadingCreate, loadingUpdate, loadingDelete])

    return (
        <Layout>

            {loading && <Loader />}

            <Modal
                modalTitle={'Create Category'}
                show={showCreateModal}
                handleClose={handleCloseCreateModal}
                onHide={handleCloseCreateModal}
            >
                {loadingCreate && <Loader />}
                {errorCreate && <Message variant="danger">{errorCreate}</Message>}
                {createMessage && <Message variant="success">{createMessage}</Message>}
                <Row>
                    <Col sm={6}>
                        <Input
                            label="First Name"
                            placeholder={'Enter name'}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                </Row>

                <div className="form-group">
                    <button type="submit" className="btn btn-light px-5" onClick={createCategoryHandler}
                    ><i className="icon-lock"></i>
                    Create
                    </button>
                </div>
            </Modal>


            <Modal
                modalTitle={'Update Category Information'}
                show={showUpdateModal}
                handleClose={handleCloseUpdateModal}
                onHide={handleCloseUpdateModal}
            >
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {createMessage && <Message variant="success">{createMessage}</Message>}
                <Row>
                    <Col sm={6}>
                        <Input
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                </Row>

                <div className="form-group">
                    <button type="submit" className="btn btn-light px-5" onClick={updateCategoryHandler}
                    ><i className="icon-lock"></i>
                    Update
                    </button>
                </div>
            </Modal>

            <Modal
                modalTitle='Are you sure to delete this Category? This action can not be restored.'
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                onHide={handleCloseDeleteModal}
            >
                {loadingCreate && <Loader />}
                {errorCreate && <Message variant="danger">{errorCreate}</Message>}
                {createMessage && <Message variant="success">{createMessage}</Message>}
                <button type="submit" className="btn btn-light px-5" style={{marginRight: '50px'}} onClick={handleCloseDeleteModal}
                ><i></i>
                    Cancel
                    </button>
                <button type="submit" className="btn btn-danger px-5" onClick={deleteCategoryHandler}
                ><i className="fa fa-trash"></i>
                    Delete Permanently
                    </button>
            </Modal>

            <div class="content-wrapper">
                <div class="container-fluid">
                    <div class="row pt-2 pb-2">
                        <div class="col-sm-9">
                            <h4 class="page-title">Category</h4>
                        </div>
                    </div>
                    <div class="row" >
                        <div class="col-lg-12">
                            <button type="button" className="btn btn-light waves-effect waves-light m-1" onClick={handleShowCreateModal}>Create Category</button>
                            <div class="card">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table id="default-datatable" class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    categoryList && categoryList?.map((category, index) => (
                                                        <tr>
                                                            <td>{category.name}</td>
                                                            <td>
                                                                <button data-toggle="modal" data-target="#updateModal" className="btn btn-light btn-sm waves-effect waves-light m-1"
                                                                    onClick={(e) => handleShowUpdateModal(e, category._id)}>
                                                                    <i className="fa fa-edit"></i>
                                                                </button>
                                                                <button data-toggle="modal" data-target="#deleteModal" className="btn btn-light btn-sm waves-effect waves-light m-1"
                                                                    onClick={(e) => handleShowDeleteModal(e, category._id)}><i className="fa fa-trash-o"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Category
