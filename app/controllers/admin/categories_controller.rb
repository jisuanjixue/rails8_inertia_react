class Admin::CategoriesController < ApplicationController
  before_action :set_category, only: %i[show edit update destroy]

  inertia_share flash: -> { flash.to_hash }

  # GET /categorys
  def index
    @categories = Category.all.order(created_at: :desc)
    render inertia: 'Admin/Category/Index', props: {
      categories: @categories.map do |category|
        serialize_category(category)
      end
    }
  end

  # GET /categorys/1
  def show
    render inertia: 'Admin/category/Show', props: {
      category: serialize_category(@category)
    }
  end

  # GET /categorys/new
  def new
    @category = Category.new
    render inertia: 'Admin/Category/New', props: {
      category: serialize_category(@category)
    }
  end

  # GET /categorys/1/edit
  def edit
    render inertia: 'Admin/Category/Edit', props: {
      category: serialize_category(@category)
    }
  end

  # category /categorys
  def create
    @category = Category.new(category_params)

    if @category.save
      redirect_to admin_categories_path, notice: 'category was successfully created.'
    else
      redirect_to admin_categories_path, inertia: { errors: @category.errors }
    end
  end

  # PATCH/PUT /categorys/1
  def update
    if @category.update(category_params)
      redirect_to admin_categories_path, notice: 'category was successfully updated.'
    else
      redirect_to admin_categories_path, inertia: { errors: @category.errors }
    end
  end

  # DELETE /categorys/1
  def destroy
    if @category.destroy!
      redirect_to admin_categories_path, notice: 'category was successfully destroyed.'
    else
      redirect_to admin_categories_path, inertia: { errors: @category.errors }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_category
    @category = Category.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def category_params
    params.require(:category).permit(:name, :id)
  end

  def serialize_category(category)
    category.as_json(only: %i[
                       id name created_at updated_at
                     ])
  end
end
